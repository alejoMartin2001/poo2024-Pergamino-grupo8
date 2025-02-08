
import { RegisterForm } from "@components/register";
import background from "@images/bg-register.svg";

export const Register = () => {
  return (
    <div className="flex w-full h-full text-white">
      <div className="w-full flex items-center justify-center bg-[#1A1B25] bg-cover bg-center h-full"
        style={{ 
          backgroundImage: `linear-gradient(to top, rgba(26,27,37,1), rgba(26,27,37,0)), url(${background})`, 
        }}
      >
        <RegisterForm />
      </div>
    </div>
  )
}