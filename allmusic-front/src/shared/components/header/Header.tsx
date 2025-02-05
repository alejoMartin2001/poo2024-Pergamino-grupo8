import { useNavigate } from "react-router";
import logo from "../../../images/logo.svg";
import { InputLabel } from "../form/formInput/InputLabel";
import { useForm } from "react-hook-form"; // Importamos el hook
import lupa from "../../../images/lupa.svg";


interface Props {
  //titulo:string;
}

export const Header = ({}: Props) => {

  const navigate = useNavigate();
  const { register } = useForm(); 

  return (
    <>
      <header className="flex items-center justify-between px-5 bg-gray-800 text-white">
        <div className="flex">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <nav className="mr-auto m-2 font-bold">
              All music 
            </nav>
        </div>
            
        {/*<div className="flex justify-center">
          <InputLabel name="search" register={register} icon={lupa} />
        </div>*/}
        <div>
            <button type="button" className="font-bold cursor-pointer m-4" onClick={() => navigate("/login")}>Sign in</button>
            <button type="button" className="font-bold cursor-pointer m-4" onClick={() => navigate("/register")}>Sign up</button>
        </div>
        
    </header>
    </>
  );
};