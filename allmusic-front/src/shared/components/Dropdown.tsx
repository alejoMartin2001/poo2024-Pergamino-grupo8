import background from "@images/bg-register.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/contexts/AuthProvider";
import { UserUpdateDto } from "src/interfaces/user-interface";
import { userUpdateAction } from "src/services/users/user-put-action";

interface Props {
  listaOpciones: { opcion: string, action: string}[];
}

export const Dropdown = ({ listaOpciones = [] }: Props) => {
  console.log(listaOpciones); // Deberías ver un array con las opciones en la consola
  const bgEnthusiast = "from-[#9333ea] to-[#db2777]";
  const bgArtist = "from-blue-600 to-[#48E5C2]";
  const { isArtist } = useAuth();
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [apellido,setApellido] = useState("");


  const handleInput = (valor:string) => {
    setName(valor);
  }

  const modificarCambios = () => {
    const userUpdateDto:UserUpdateDto = {
      firstName: name || null,
      lastName: null,
      email: null,
      password: null,
      profilePicture:  null,
      bio: null
    };
  
    userUpdateAction(userUpdateDto);
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(26,27,37,1), rgba(26,27,37,0)), url(${background})`,
      }}
    >
      
      <div className="w-full max-w-md bg-gray-500 p-6 rounded-2xl shadow-md">
        
        <span
          className={`font-semibold text-2xl mb-2 bg-gradient-to-tr ${
            isArtist ? bgArtist : bgEnthusiast
          } bg-clip-text text-transparent`}
        >
          Configuración de Usuario
        </span>
        
        {listaOpciones.map((op, index) => {
          if (op.opcion.toLowerCase() === "volver") {
              return (
                  <div key={index} className="mb-4">
                      <button onClick={() => navigate("/home")}>Volver</button>
                  </div>
              );
          }
          return (
              <div key={index} className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {op.opcion} 
                  </label>
                  <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => handleInput(e.target.value)}
                      placeholder="Digite para el cambio"
                  />
                  <button onClick={() => modificarCambios()}>{op.action}</button>
              </div>
          );
      })}
        

      </div>
    </div>
  );
};
