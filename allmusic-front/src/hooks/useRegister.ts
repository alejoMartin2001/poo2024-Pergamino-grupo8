import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { UserRequestDto } from 'src/interfaces/user-interface';
import { registerArtistAction, registerEnthAction } from 'src/services/actions/register-action';

import { useMutation } from '@tanstack/react-query';

export const useRegister = (isArtist: boolean) => {

  const navigate = useNavigate();

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
      navigate("/");
    },
    onError: (error: AxiosError) => {
      console.log(error);
    }
  });

  const onSubmit = (formData: UserRequestDto, passwordValid: boolean) => {
    if (passwordValid){
      mutation.mutate(formData);
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
