import background from '@images/bg-register.svg';
import { useNavigate } from 'react-router';
import error from '@images/404.svg';

export const Error404 = () => {
  const navigate = useNavigate();
  //HACERLO REUTILIZABLE.
  return (
    <div className="flex w-full min-h-screen">
      <div
        className="flex w-full min-h-screen items-center justify-center bg-[#1A1B25] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(26,27,37,1), rgba(26,27,37,0)), url(${background})`,
        }}
      >
        <div className="text-center">
          {/* 404 Title */}
          <h1 className="font-sans text-9xl text-white mb-4">404</h1>

          {/* Error Image */}
          <img src={error} alt="Error 404" className="m-2 h-80 w-100" />

          {/* Description */}
          <h2 className="text-white text-2xl mb-4">No se encontró la página solicitada.</h2>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button 
              type="button"
              className="font-bold text-white bg-gradient-to-tr from-[#9333ea] to-[#db1e73] 
              px-4 py-2 rounded transition delay-150 duration-300 
              ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer"
              onClick={() => navigate("/login")}>Iniciar Sesión</button>
            <button
              type="button"
              className="font-bold text-white bg-gradient-to-tr from-blue-600 to-[#3de2be] 
              px-4 py-2 rounded transition delay-150 duration-300 
              ease-in hover:-translate-y-1 hover:scale-110 cursor-pointer"
              onClick={() => navigate("/register")}>Registrarse</button>
          </div>

        </div>

      </div>
      
    </div>
  );
};

