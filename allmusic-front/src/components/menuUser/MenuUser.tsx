// MenuUser.tsx
import { CustomButton } from "@shared/components/CustomButton"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "src/contexts/AuthProvider";
import { useImage } from "src/hooks/useImage";

//USAR EL CONTEXTO AUTH-PROVIDER
export const MenuUser = () => {
    
    //utilizo los datos del usuario y el atributo isArtist
    const {user, isArtist} = useAuth();

    //hook que guarda el avatar del entusiasta.
    const [avatar, setAvatar] = useState("");
    //exporto la funcion de useImage para llamarla, y le paso el set asi carga el avatar.
    const {imgAvatar} = useImage({setAvatar});
     
    //hook para desplegar el menu cuando se aprete en el perfil
    const [isOpen, setIsOpen] = useState(false);
    //hook para desplegar el menu de configuraciones cuando se aprete
    const [confOpen, setConfOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const openConfig = () => {
      setConfOpen(!confOpen);
    };
    
    const handleLogout = () => {
        navigate("/");
    };

    //el useEffect llama a imgAvatar(), pero deberia hacerlo cuando algo cambia.
    useEffect(() => {
        imgAvatar();     
    }, [imgAvatar]);

    return (
        <nav className="bg-gray-800">
            <div className="max-w-screen-xl flex items-center justify-between p-4 mx-auto">
                
                {!isArtist ? (
                <div className="relative">
                    
                    <CustomButton onClick={toggleDropdown} nombreButton="" className="flex items-center text-sm bg-gray-800 rounded-full cursor-pointer"> 
                        <img className="w-10 h-10 rounded-full" src={avatar} alt="Foto de usuario" />
                    </CustomButton>

                    {isOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-md dark:bg-gray-700">
                                
                                <span className="block text-sm px-2 py-1 text-gray-900 dark:text-white"> Nombre: {user?.firstName} {user?.lastName}</span>
                                <span className="block text-sm px-2 py-1 text-gray-800 dark:text-white"> Usuario: {user?.username}</span>
                            
                            <ul className="py-1">    
                                <li>
                                    <CustomButton onClick={openConfig} className="w-full text-left block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200" nombreButton="Configuración"></CustomButton>
                                </li>
                                    {confOpen && (
                                      <div >
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Cambiar nombre</a></li>
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Cambiar usuario</a></li>
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Cambiar contraseña</a></li>
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Editar foto de perfil</a></li>
                                      </div>)}
                                
                                <li>
                                    <CustomButton onClick={handleLogout} className="w-full text-left block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200" nombreButton="Cerrar sesión"></CustomButton>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>)
                : (<div className="relative">
                    
                    <CustomButton onClick={toggleDropdown} nombreButton="" className="flex items-center text-sm bg-gray-800 rounded-full cursor-pointer"> 
                    <img
                        className="w-10 h-10 rounded-full"
                        src={""}
                        alt="Foto de usuario"/>
                    </CustomButton>

                    {isOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-md dark:bg-gray-700">
                                
                                <span className="block text-sm px-2 py-1 text-gray-900 dark:text-white"> Nombre: {user?.firstName} {user?.lastName}</span>
                                <span className="block text-sm px-2 py-1 text-gray-800 dark:text-white"> Usuario: {user?.username}</span>
                            
                            <ul className="py-1">    
                                <li>
                                    <CustomButton onClick={openConfig} className="w-full text-left block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200" nombreButton="Configuración"></CustomButton>
                                </li>
                                    {confOpen && (
                                      <div >
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Cambiar nombre</a></li>
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Cambiar usuario</a></li>
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Cambiar contraseña</a></li>
                                        <li className="w-full ml-2 block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200"><a href="#">Editar foto de perfil</a></li>
                                      </div>)}
                                
                                <li>
                                    <CustomButton onClick={handleLogout} className="w-full text-left block px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200" nombreButton="Cerrar sesión"></CustomButton>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>)}
            </div>
        </nav>
    );
};


