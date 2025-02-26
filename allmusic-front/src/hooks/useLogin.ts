import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/contexts/AuthProvider"
import { TokenDecode } from "src/interfaces/auth-interface";
import { authLoginAction } from "src/services/actions/auth-action";
import { userGetAction } from "src/services/users/user-get-action";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authLoginAction(username, password);
      const token = data.token;
      const claims = decodeToken(token);

      if (!claims) {
        console.error("Error: No se pudo decodificar el token.");
        return;
      }
      console.log(claims);
      const userInfo = await userGetAction(claims.sub);

      login(token, claims, userInfo);
      navigate("/home");
    } catch (error) {
      setError("Error al login");
    } finally {
      setIsLoading(false);
    };

  }

  return {
    isLoading,
    error,
    handleLogin,
  }
}
