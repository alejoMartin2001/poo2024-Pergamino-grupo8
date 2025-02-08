
import { LoginForm } from "@components/login";
import pattern from "../images/bg-pattern.svg";


export const Login = () => {
  return (
    <div className="flex w-full h-screen text-white">
      <div className={`w-full flex items-center justify-center bg-[#1A1B25] bg-cover bg-center h-full`}
        style={{ 
          backgroundImage: `linear-gradient(to top, rgba(26,27,37,1), rgba(26,27,37,0)), url(${pattern})`,
        }}>
        <LoginForm />
      </div>
    </div>
  );
};