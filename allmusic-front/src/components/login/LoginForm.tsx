import { useForm } from "react-hook-form"
import { FormInputField } from "../../shared/components/form/FormInputField"

interface Props {
};

export const LoginForm = ({}: Props) => {
  
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  
  return (
    <form 
      className="bg-gray-800 px-15 py-20 rounded-3xl shadow-2xl w-full mx-10"
      onSubmit={onSubmit}
    >
      <h1 className="text-4xl font-bold text-[#db2777]">¡Bienvenido a 
        <span className="
          ml-1.5
          bg-gradient-to-tr from-[#9333ea] to-[#db2777] 
          bg-clip-text text-transparent"
          >
            AllMusic
        </span>!
      </h1>
      <p className="font-medium text-lg text-gray-400 mt-4">Inicia sesión como Entusiasta</p>

      <div className="mt-8">
        <FormInputField 
          label="Nombre de usuario"
          name="username"
          register={register}
        />
        <FormInputField 
          label="Contraseña"
          name="password"
          type="password"
          register={register}
        />
      </div>

      <div className="flex mt-4 items-center justify-end">
        <button 
          className="font-medium text-base text-gray-400 cursor-pointer hover:text-gray-300" 
          type="button"
        >
          Olvide mi contraseña
        </button>
      </div>

      <div className="mt-2 flex">
        <button className="
          py-3 rounded-md w-1/2 bg-[#db2777] text-lg font-bold transition-all
          active:scale-[.98] hover:scale-[1.01] drop-shadow-lg"
        >
          Iniciar sesión
        </button>
        <div className="mx-3 flex justify-center items-center w-1/2">
          <p className="font-medium text-base text-gray-400 mr-1.5">¿No tienes cuenta?</p>
          <button className="text-[#db2777] text-base font-medium cursor-pointer " type="button">Registrate</button>
        </div>
      </div>

    </form>
  );
};