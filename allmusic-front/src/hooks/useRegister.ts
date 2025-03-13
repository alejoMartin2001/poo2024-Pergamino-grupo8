import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { UserRequestDto } from 'src/interfaces/user-interface';
import { registerArtistAction, registerEnthAction } from 'src/services/actions/register-action';

import { useMutation } from '@tanstack/react-query';
import { useAlert } from 'src/contexts/AlertProvider';

export const useRegister = (isArtist: boolean) => {

  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitting }
  } = useForm<UserRequestDto>();

  const mutation = useMutation({
    mutationFn: isArtist ? registerArtistAction : registerEnthAction,
    onSuccess: () => {
      localStorage.setItem("alertMessage", "Tu cuenta ha sido creada. ¡Bienvenido!"); // Guarda el mensaje de alerta
      localStorage.setItem("alertType", "success"); // Guarda el tipo de alerta
      localStorage.setItem("alertTitle", "Registro exitoso")
      navigate("/login");
    },
    onError: (error: AxiosError) => {
      // Solucionar esto!!
      let message = "Hubo un error en el registro";
      console.log(error);

      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string };
        message = errorData.message || message;
      }

      showAlert("Error de registro", message, "error");
    }

  });

  const onSubmit = (data: UserRequestDto, passwordValid: boolean) => {
    if (passwordValid) {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      if (data.profilePicture && data.profilePicture.length > 0) {
        formData.append("profilePicture", data.profilePicture[0]);
      }
      formData.append("bio", data.bio);

      mutation.mutate(formData);
      console.log(data);
    };
    return;

  };

  return {
    errors,
    control,
    isSubmitting,
    isLoading: mutation.isPending,

    register,
    handleSubmit,
    watch,
    setValue,
    onSubmit,
    setError,
  }
}
