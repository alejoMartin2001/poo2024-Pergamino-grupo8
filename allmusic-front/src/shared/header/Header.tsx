import { MenuUser } from "@components/menuUser/MenuUser";
import { useNavigate } from "react-router";
import { useAuth } from "src/contexts/AuthProvider";

export const Header = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="z-10 h-16 bg-gray-800 text-white transition-all duration-300 ">
        <div className="flex items-center justify-between px-5 h-full">
          <nav className="m-2 mr-auto font-bold text-xl bg-gradient-to-l from-[#9333ea] to-[#db2777] bg-clip-text text-transparent">
            AllMusic
          </nav>

          {isAuth ? (
            <MenuUser />
          ) : (
            <div>
              <button
                type="button"
                className="m-4 font-bold cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Iniciar sesión
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
