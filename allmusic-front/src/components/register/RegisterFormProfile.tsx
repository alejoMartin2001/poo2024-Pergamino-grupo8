
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
import { UserRequestDto } from 'src/interfaces/user-interface';

import { FormInputFile, FormInputText, FormTextArea } from '@shared/form';
import { useEffect } from 'react';

interface Props {
  isArtist: boolean;
  errors: FieldErrors<UserRequestDto>;
  control: Control<UserRequestDto, any>;


  register: UseFormRegister<UserRequestDto>;
  setValue: UseFormSetValue<UserRequestDto>;
  setIsValidProfile: (isValidProfile: boolean) => void;
}

export const RegisterFormProfile = ({
  errors,
  isArtist,
  control,
  register,
  setValue,
  setIsValidProfile,
}: Props) => {

  const [firstName, lastName, email, artistName] = useWatch({
    control,
    name: ["firstName", "lastName", "email", "artistName"],
  });
  
  useEffect(() => {
    const isValidEmail = email?.trim() !== "" && !errors.email;
    const isValidArtistName = isArtist ? Boolean(artistName) : true;
    const isValid = Boolean(firstName) && Boolean(lastName) && isValidEmail && isValidArtistName;
    setIsValidProfile(isValid);
  }, [firstName, lastName, email, artistName, errors.email, isArtist, setIsValidProfile]);

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

      {isArtist &&
        <div className='mt-3'>
          <FormInputText
            label='Nombre artístico'
            name='artistName'
            register={register}
            error={errors.artistName}
            requiredMessage='El nombre artístico está vacio'
          />
        </div>
      }

      <div className="mt-3">
        <FormInputText
          label="Email"
          type="email"
          name="email"
          register={register}
          error={errors.email}
          requiredMessage="El campo Email está vacio."
        />
      </div>

      <div className="mt-3">
        <FormTextArea label="Descripción" name="bio" register={register} text="Escribe algunas frases sobre ti." />
      </div>

      <div className="mt-3">
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
