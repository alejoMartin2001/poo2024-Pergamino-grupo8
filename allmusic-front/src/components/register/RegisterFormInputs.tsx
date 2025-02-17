
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { UserRequestDto } from 'src/interfaces/user-interface';

import { FormInputFile, FormInputText, FormTextArea } from '@shared/form';

interface Props {
  isArtist: boolean;
  errors: FieldErrors<UserRequestDto>;
  confirmPassword: string;
  passwordValid: boolean;

  setConfirmPassword: (confirmPassword: string) => void;
  register: UseFormRegister<UserRequestDto>;
  setValue: UseFormSetValue<UserRequestDto>;

}

export const RegisterFormInputs = ({ 
  errors, 
  isArtist, 
  confirmPassword, 
  passwordValid, 
  register, 
  setValue, 
  setConfirmPassword, 

}: Props) => {
  return (
    <>
      <div className="flex gap-3">
        <FormInputText
          label="Nombre"
          name="firstName"
          register={register}
          error={errors.firstName}
          requiredMessage="El campo Nombre está vacio."
        />
        <FormInputText
          label="Apellido"
          name="lastName"
          register={register}
          error={errors.lastName}
          requiredMessage="El campo Apellido está vacio."
        />
      </div>

      <div className="mt-5">
        <FormInputText
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
          requiredMessage="El campo Email está vacio."
        />
      </div>

      <div className="mt-5">
        <FormTextArea label="Descripción" name="bio" register={register} text="Escribe algunas frases sobre ti." />
      </div>

      <div className="mt-5">
        <FormInputFile
          label="Foto de perfil"
          name="profilePicture"
          register={register}
          setValue={setValue}
          isArtist={isArtist}
        />
      </div>

      <div className="mt-5">
        <FormInputText
          label="Nombre de usuario"
          name="username"
          register={register}
          error={errors.username}
          requiredMessage="El nombre de usuario es obligatorio."
        />
      </div>

      <hr className="my-4 border-t border-gray-700" />
      <div className="flex gap-3 mt-5">
        <FormInputText
          type="password"
          label="Contraseña"
          name="password"
          register={register}
          error={errors.password}
          requiredMessage="La contraseña es obligatoria."
        />
        <div className="w-full">
          <label htmlFor="confirmarPassword" className="block text-sm font-medium">Confirmar contraseña</label>
          <input
            className="w-full rounded-md p-2 mt-1 bg-[#1A1B25]"
            id="confirmarPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!passwordValid && confirmPassword && <p className="mt-1 text-sm text-red-500">La contraseña no conincide</p>}
        </div>

      </div>
    </>
  )
}
