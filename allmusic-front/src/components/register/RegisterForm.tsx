
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRegister } from 'src/hooks/useRegister';

import { LoaderSpinner } from '@shared/components';

import { RegisterFormProfile } from './RegisterFormProfile';
import { RegisterFormData } from './RegisterFormData';

const colorEnthusiast: string = 'text-[#db2777]';
const colorArtist: string = 'text-blue-600';
const bgEnthusiast: string = 'from-[#9333ea] to-[#db2777]';
const bgArtist: string = 'from-blue-600 to-[#48E5C2]';

export const RegisterForm = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [isValidProfile, setIsValidProfile] = useState(false);

  // Lógica para la contraseña
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  // Verificar si el usuario quiere ser artista.
  const [isArtist, setIsArtist] = useState<boolean>(false);

  // Lógica del registro.
  const { register, handleSubmit, watch, setValue, onSubmit, control, errors, isLoading } = useRegister(isArtist);

  // console.log(isValidProfile)

  return (
    <form
      className="flex flex-col px-6 py-10 my-2 bg-gray-800 rounded-3xl max-md:m-3 max-md:px-5"
      onSubmit={handleSubmit((data) => {
        onSubmit(data, passwordValid)
        setConfirmPassword("");
      })}
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

      <hr className="my-4 border-t border-gray-700" />

      <div className="flex w-full gap-3 max-md:flex-col">

        <div className="flex flex-col justify-between w-2/5 max-md:w-full">
          <div className="max-md:hidden">
            <h1 className="text-3xl font-medium text-gray-400">{step === 1 ? "Perfil" : "Autenticación"}</h1>
            <p className="text-gray-100">Esta información se mostrará públicamente, así que tenga cuidado con lo que comparte.</p>
          </div>

          <div>
            <p className="mt-4 text-xl text-gray-400">Te registrarás como
              <button className={`
                ml-2 font-medium cursor-pointer 
                bg-gradient-to-l ${isArtist ? bgArtist : bgEnthusiast} bg-clip-text text-transparent`}
                type="button"
                onClick={() => setIsArtist(!isArtist)}
              >
                {isArtist ? "Artista" : "Entusiasta"}
              </button>
            </p>
            <p>¿Ya tienes cuenta?
              <button
                className={`${isArtist ? colorArtist : colorEnthusiast} ml-2 font-semibold cursor-pointer`}
                type="button"
                onClick={() => navigate("/login")}
              >Inicia sesión</button>
            </p>
          </div>
        </div>

        <div className="w-3/5 max-md:w-full">
          {isLoading ?
            (<p className="flex items-center justify-center h-full ">
              <LoaderSpinner />
            </p>) : (

              <>
                {step === 1 ? (
                  <RegisterFormProfile
                    errors={errors}
                    control={control}
                    isArtist={isArtist}
                    setIsValidProfile={setIsValidProfile}
                    register={register}
                    setValue={setValue}
                  />
                ) : (
                  <RegisterFormData
                    confirmPassword={confirmPassword}
                    errors={errors}
                    passwordValid={passwordValid}
                    register={register}
                    setConfirmPassword={setConfirmPassword}
                    setPasswordValid={setPasswordValid}
                    watch={watch}
                  />
                )}

                <div className="mt-5 flex gap-2">
                  {step === 2 && (
                    <button
                      className="p-2 w-full rounded-md font-medium text-white bg-gray-500 hover:bg-gray-600 transition-all"
                      onClick={() => setStep(1)}
                    >
                      Atrás
                    </button>
                  )}

                  <button
                    type={step === 1 ? "button" : "submit"}
                    className={`p-2 w-full rounded-md font-medium text-white 
                      ${step === 1 ? "bg-blue-500 hover:bg-blue-600" : `bg-gradient-to-l ${isArtist ? bgArtist : bgEnthusiast}`}
                      bg-[length:200%_200%] bg-left 
                      transition-all duration-300 ease-in-out 
                      hover:bg-right hover:scale-[1.01] active:scale-[.98]
                      cursor-pointer
                      disabled:cursor-not-allowed`}
                    onClick={() => (step === 1 ? setStep(2) : undefined)}
                    disabled={!isValidProfile}
                  >
                    {step === 1 ? "Continuar" : `Crear ${isArtist ? "Artista" : "Usuario"}`}
                  </button>
                </div>
              </>
            )}
        </div>

      </div>

    </form>
  )
}