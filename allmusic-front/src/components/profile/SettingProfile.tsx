import { UserUpdateDto } from "src/interfaces/user-interface";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputText } from "@shared/form";
import { useUserDelete } from "src/hooks/useUserDelete";

interface Props {
  register: UseFormRegister<UserUpdateDto>;
  errors: FieldErrors<UserUpdateDto>;
}

export const SettingProfile = ({ register, errors }: Props) => { 
  const deleteUser = useUserDelete();
  
  return (
    <div className="flex flex-col w-full h-full bg-gray-800 rounded-3xl shadow-lg p-8 gap-5 max-md:h-full text-white">
      <span className="text-2xl font-bold self-start">Editar perfil</span>

      {/* Contenedor para centrar los inputs */}
      <div className="flex flex-col items-start w-full gap-4">
        <FormInputText
          label="Nombre"
          type="text"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
        <FormInputText
          label="Apellido"
          type="text"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
        <FormInputText
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
        />
        <FormInputText
          label="ProfilePicture"
          type="text"
          name="profilePicture"
          register={register}
          error={errors.profilePicture}
        />
        <FormInputText
          label="Bio"
          type="text"
          name="biography"
          register={register}
          error={errors.bio}
        />
        <FormInputText
          label="Password"
          type="password"
          name="password"
          register={register}
          error={errors.password}
        />
      </div>
      <div className="flex flex-row items-center gap-4">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded self-center mt-auto cursor-pointer"
      >
        Actualizar
      </button>
      <button
        onClick={() => {
          const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar tu usuario? Esta acción es irreversible."
          );
          if (confirmDelete) {
            deleteUser;
          }
        }}
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded self-center mt-auto cursor-pointer"
      >
        Eliminar Usuario
      </button>

      </div>
    </div>
  );
};
