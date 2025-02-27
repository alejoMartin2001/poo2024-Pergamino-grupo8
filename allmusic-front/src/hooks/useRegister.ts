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
      let message: string = "";
      if (error.response) {
        message = error.response.data as string;
      }else if (error.request) {
        message = "Hubo un error en el registro"
      }
      showAlert("Error", message, "error");
    }
    
  });

  const onSubmit = (formData: UserRequestDto, passwordValid: boolean) => {
    if (passwordValid ) {
      // mutation.mutate({...formData, profilePicture: "admin-0.png"});
      mutation.mutate(formData);

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
