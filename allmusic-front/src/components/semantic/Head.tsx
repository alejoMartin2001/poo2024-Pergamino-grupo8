
import { ProfileHead, SearchHead } from "@shared/head";
import { useNavigate } from "react-router"
import { useAuth } from "src/contexts/AuthProvider";

export const Head = () => {

  const { isAuth, isArtist, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 w-full bg-gray-800/30 backdrop-blur-md text-white p-3 shadow-md z-50">
      <div className="flex justify-between items-center px-10 max-md:px-2">
        {!isAuth &&
          <h1
            className="
            bg-gradient-to-l from-[#9333ea] to-[#db2777] 
            bg-clip-text text-transparent font-bold text-2xl"
          >AllMusic
          </h1>}

        {isAuth ? (
          <div className="flex items-center gap-6 max-md:justify-center w-full ">
            <SearchHead />
            <div className="w-[1px] h-8 bg-gray-700 "></div>
            <ProfileHead logout={logout} user={user} isArtist={isArtist}/>
          </div>
        ) : (
          <button
            type="button"
            className="bg-transparent px-4 py-2 rounded-md transition duration-200 cursor-pointer
            hover:bg-[#7F20CC] font-medium active:scale-[.98]"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>
        )}

      </div>
    </header>
  )
}