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
    formState: { errors, isSubmitting }
  } = useForm<UserRequestDto>();

  const mutation = useMutation({
    mutationFn: isArtist ? registerArtistAction : registerEnthAction,
    onSuccess: () => {
      localStorage.setItem("alertMessage", "Te has registrado"); // Guarda el mensaje de alerta
      localStorage.setItem("alertType", "success"); // Guarda el tipo de alerta
      localStorage.setItem("alertTitle", "Registro exitoso")
      navigate("/login");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      showAlert("Error", "Hubo un error en el registro", "error");
    }
  });

  const onSubmit = (formData: UserRequestDto, passwordValid: boolean) => {
    if (passwordValid && !formData.profilePicture) {
      mutation.mutate({...formData, profilePicture: "admin-0.png"});
    };
    return;

  };

  return {
    errors,
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
