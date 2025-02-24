
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
import { UserRequestDto } from 'src/interfaces/user-interface';

import { FormInputFile, FormInputText, FormTextArea } from '@shared/form';
import { useEffect } from 'react';

interface Props {
  isArtist: boolean;
  errors: FieldErrors<UserRequestDto>;
  control: Control<UserRequestDto, any>;

  setIsValidProfile: (isValidProfile: boolean) => void;
  register: UseFormRegister<UserRequestDto>;
  setValue: UseFormSetValue<UserRequestDto>;
  // watch: UseFormWatch<UserRequestDto>;

}

export const RegisterFormProfile = ({
  errors,
  isArtist,
  control,
  register,
  setValue,
  // watch,
  setIsValidProfile
}: Props) => {

  // useEffect(() => {
  //   const isValid =
  //     !!watch("firstName") &&
  //     !!watch("lastName") &&
  //     !!watch("email") &&
  //     !errors.firstName &&
  //     !errors.lastName &&
  //     !errors.email
  //   ;

  //   setIsValidProfile(isValid);
  // }, [watch("firstName"), watch("lastName"), watch("email")]);

  const [firstName, lastName, email] = useWatch({
    control,
    name: ["firstName", "lastName", "email"],
  });

  useEffect(() => {
    const isValidEmail = email?.trim() !== "" && !errors.email;
    const isValid = Boolean(firstName) && Boolean(lastName) && isValidEmail;
    setIsValidProfile(isValid);
  }, [firstName, lastName, email, errors.email, setIsValidProfile]);

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

      <hr className="my-4 border-t border-gray-700" />
    </>
  )
}
