import { LoginForm } from "../components/login/LoginForm";
import { LoginImage } from "../components/login/LoginImage";
import playlist from "../images/login/login-playlist.svg"

interface Props {

};

export const Login = ({}: Props) => {
  return (
    <div className="flex h-screen w-full text-white">
      <div className="w-full flex items-center justify-center lg:w-1/2 bg-[#1A1B25]">
        <LoginForm />
      </div>

      <div className="
        hidden lg:flex h-full w-1/2 items-center justify-center 
        bg-gradient-to-tr from-[#1e3a8a] via-[#9333ea] to-[#db2777]">
        <LoginImage image={playlist}/>
      </div>

    </div>
  );
};