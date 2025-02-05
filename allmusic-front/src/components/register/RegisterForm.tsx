import { FormInputField } from "@shared/components/form/FormInputField"
import { FormTextArea } from "@shared/components/form/FormTextArea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date,
  profilePicture: string;
  bio: string;
  username: string;
  password: string;
}

const colorEnthusiast: string = 'text-[#db2777]';
const colorArtist: string = 'text-blue-600';
const bgEnthusiast: string = 'from-[#9333ea] to-[#db2777]';
const bgArtist: string = 'from-blue-600 to-[#48E5C2]';

export const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  // Lógica para la contraseña
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  // Verificar si el usuario quiere ser artista.
  const [isArtist, setIsArtist] = useState<boolean>(false);


  useEffect(() => {
    if (watch("password").length === 0) setPasswordValid(false);

    setPasswordValid(confirmPassword === watch("password"));
  }, [confirmPassword])


  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      className="flex flex-col px-10 py-15 bg-gray-800 rounded-3xl max-md:m-3 max-md:px-5"
      onSubmit={onSubmit}
    >
      <h1 className={`text-4xl font-bold ${isArtist ? colorArtist : colorEnthusiast} max-md:text-3xl`}>Registrate en
        <span className={`
          ml-2.5
          bg-gradient-to-tr ${isArtist ? bgArtist : bgEnthusiast}
          bg-clip-text text-transparent`
          }
        >
          AllMusic
        </span>
      </h1>
      
      <hr className="border-t border-gray-700 my-4" />

      <div className="flex w-full gap-5 max-md:flex-col">

        <div className="w-2/5 max-md:w-full">
          <div className="max-md:hidden">
            <h1 className="text-3xl font-medium text-gray-400">Perfil</h1>
            <p className="text-gray-100">Esta información se mostrará públicamente, así que tenga cuidado con lo que comparte.</p>
          </div>

          <p className="mt-4 text-gray-400 text-xl">Te registrarás como
            <button className={`
              ml-2 font-medium cursor-pointer 
              bg-gradient-to-l ${isArtist ? bgArtist : bgEnthusiast} bg-clip-text text-transparent`}
              type="button"
              onClick={ () => setIsArtist(!isArtist) }
            >
              {isArtist ? "Artista" : "Entusiasta"}
            </button>
          </p>
        </div>

        <div className="w-3/5 max-md:w-full">
          <div className="flex gap-6">
            <FormInputField
              label="Nombre"
              name="firstName"
              register={register}
              error={errors.firstName}
              requiredMessage="El campo NO puede estar vacio."
            />
            <FormInputField
              label="Apellido"
              name="lastName"
              register={register}
              error={errors.lastName}
              requiredMessage="El campo NO puede estar vacio."
            />
          </div>

          <div className="mt-5">
            <FormInputField
              label="Email"
              type="email"
              name="email"
              register={register}
              error={errors.email}
              requiredMessage="El email no es valido."
            />
          </div>

          <div className="mt-5">
            <FormTextArea label="Descripción" name="bio" register={register} text="Escribe algunas frases sobre ti." />
          </div>

          <div className="mt-5">
            <FormInputField
              label="Nombre de usuario"
              name="username"
              register={register}
              error={errors.username}
              requiredMessage="El campo es obligatorio!"
            />
          </div>

          <hr className="border-t border-gray-700 my-4" />
          <div className="flex gap-6 mt-5">
            <FormInputField
              type="password"
              label="Contraseña"
              name="password"
              register={register}
              error={errors.firstName}
              requiredMessage="El campo NO puede estar vacio."
            />
            <div className="w-full">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirmar contraseña</label>
              <input
                className="w-full rounded-md p-2 mt-1 bg-[#1A1B25]"
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!passwordValid && <p className="text-red-500 text-sm mt-1">El password no conincide</p>}
            </div>

          </div>

          <div className="mt-5">
            <button className={`p-2 w-full rounded-md font-medium text-white 
              bg-gradient-to-l ${isArtist ? bgArtist : bgEnthusiast}
              bg-[length:200%_200%] bg-left 
              transition-all duration-300 ease-in-out 
              hover:bg-right hover:scale-[1.01] active:scale-[.98]`}
            >
              Crear Usuario
            </button>
          </div>

        </div>
      </div>

    </form>
  )
}