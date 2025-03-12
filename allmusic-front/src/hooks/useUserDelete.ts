import { useNavigate } from "react-router";
import { userDeleteAction } from "src/services/users/user-delete-action";
import { useAuth } from "src/contexts/AuthProvider";

export const useUserDelete = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Asegura que el estado de autenticación se borre

  const deleteUser = async () => {
    try {
      await userDeleteAction();
      logout(); // Borra datos de autenticación
      navigate("/"); // Redirige a Preview
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  return deleteUser;
};
