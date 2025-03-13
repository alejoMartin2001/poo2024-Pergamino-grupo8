import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAlert } from 'src/contexts/AlertProvider';
import { useAuth } from 'src/contexts/AuthProvider';
import { Login, tokenAuth, TokenDecode } from 'src/interfaces/auth-interface';
import { authLoginAction } from 'src/services/actions/auth-action';
import { userGetAction } from 'src/services/users/user-get-action';

import { useMutation } from '@tanstack/react-query';

const decodeToken = (token: string): TokenDecode | null => {
  try {

    const payload: string = token.split(".")[1];
    const decodeString: string = atob(payload);
    const rawData = JSON.parse(decodeString);

    const parseData: TokenDecode = {
      ...rawData,
      authorities: JSON.parse(rawData.authorities)
    };

    return parseData;

  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

export const useLogin = () => {

  const navigate = useNavigate();

  const { login } = useAuth();
  const { showAlert } = useAlert();
  const { register, handleSubmit } = useForm<Login>();

  const mutation = useMutation({
    mutationFn: authLoginAction,
    onSuccess: (data) => handleLoginSucess(data),
    onError: (error: AxiosError) => {
      // Solucionar esto!!
      console.log(error);
      let message = "Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.";

      showAlert("Error de Autenticación", message, "error");
    }
  });

  const onSubmit = (login: Login) => {
    mutation.mutate(login)
  }

  // Privado.
  const handleLoginSucess = async (data: tokenAuth) => {
    const token = data.token;
    const claims = decodeToken(token);

    if (!claims) {
      console.error("Error: No se pudo decodificar el token.");
      return;
    }

    const userInfo = await userGetAction(claims.sub);

    navigate("/");
    login(token, claims, userInfo);
  }

  return {
    isLoading: mutation.isPending,

    register,
    handleSubmit,
    onSubmit,

  }
}
