import { MenuUser } from "@components/menuUser/MenuUser";
import { useNavigate } from "react-router"
import { useAuth } from "src/contexts/AuthProvider";

interface Props {

}

export const Head = ({ }: Props) => {

  const { isAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 w-full bg-gray-800/30 backdrop-blur-md text-white p-3 shadow-md z-50">
      <div className="flex justify-between items-center px-10">
        <h1
          className="
            bg-gradient-to-l from-[#9333ea] to-[#db2777] 
            bg-clip-text text-transparent font-bold text-2xl"
        >AllMusic
        </h1>

        {isAuth ?
          <MenuUser /> :
          <button
            type="button"
            className="bg-transparent p-2 rounded-xs transition duration-200 cursor-pointer
           hover:bg-[#9333ea] font-medium active:scale-[.98] active:bg-[#7F20CC]"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>}

      </div>
    </header>
  )
}