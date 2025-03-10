import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { userUpdateAction } from "src/services/users/user-put-action";
import { UserUpdateDto } from "src/interfaces/user-interface";
import { useAuth } from "src/contexts/AuthProvider";

export const useUser = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateDto>();

  const onSubmit = async (data: UserUpdateDto) => {
    try {
      // Filtrar los valores vacíos o no modificados
      const updatedFields = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "" && value !== null)
      );
  
      // Crear el nuevo objeto de usuario manteniendo los valores previos
      const updatedUser = { ...user, ...updatedFields };
  
      console.log(updatedUser);
      
      // Enviar solo los campos actualizados a la API
      await userUpdateAction(updatedFields);

      // Actualizar el usuario en localStorage y en el contexto
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
  };
};


