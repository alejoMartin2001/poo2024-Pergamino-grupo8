import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useLogin } from 'src/hooks/useLogin';

import logo from '@images/logo-web.svg';
import { FormInputText } from '@shared/form';

interface FormData {
  username: string;
  password: string;
};

export const LoginForm = () => {
  
  const navigate = useNavigate();
  const { handleLogin } = useLogin();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    handleLogin(data.username, data.password);
  });
  
  return (
    <form 
      className="bg-gray-800 px-15 py-15 max-md:px-5 rounded-3xl shadow-2xl w-2xl max-md:mx-3"
      onSubmit={onSubmit}
    >
      <img className="h-auto w-[50px] mb-4 cursor-pointer hover:scale-[1.1]" onClick={() => navigate("/")} src={logo} alt="AllMusic" />
      <h1 className="text-4xl font-bold text-[#db2777] max-md:text-3xl">¡Bienvenido a 
        <span className="
          ml-2.5
          bg-gradient-to-tr from-[#9333ea] to-[#db2777] 
          bg-clip-text text-transparent"
          >
            AllMusic
        </span>!
      </h1>
      <p className="font-medium text-lg text-gray-400 mt-4">Inicia sesión como Entusiasta</p>

      <div className="mt-8">
        <FormInputText
          label="Nombre de usuario"
          name="username"
          register={register}
        />
        <FormInputText 
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

      <div className="mt-2 flex max-md:flex-col">
        <button className="
          max-md:w-full
          py-3 rounded-md w-1/2 bg-[#db2777] text-lg font-bold transition-all
          active:scale-[.98] hover:scale-[1.01] drop-shadow-lg
          cursor-pointer"
        >
          Iniciar sesión
        </button>
        <div className="flex justify-center items-center w-1/2 max-md:w-full max-md:mt-3">
          <p className="font-medium text-base text-gray-400 mr-1.5">¿No tienes cuenta?</p>
          <button className="text-[#db2777] text-base font-medium cursor-pointer" 
            type="button"
            onClick={() => navigate("/register")}
          >Registrate</button>
        </div>
      </div>

    </form>
  );
};