import { useNavigate } from "react-router";
import logo from "@images/logo-web.svg";
// import { InputLabel } from "../../form/formInput/InputLabel";
// import { useForm } from "react-hook-form"; // Importamos el hook
// import lupa from "../../../images/lupa.svg";


interface Props {
  //titulo:string;
}

export const Header = ({}: Props) => {

  const navigate = useNavigate();
  // const { register } = useForm(); 

  return (
    <>
      <header className="flex items-center justify-between px-5 text-white bg-gray-800 fixed w-full z-10">
        <div className="flex">
            {/* <img src={logo} alt="Logo" className="w-auto h-10" /> */}
            <nav className="m-2 mr-auto font-bold text-xl bg-gradient-to-l from-[#9333ea] to-[#db2777] bg-clip-text text-transparent">
              AllMusic 
            </nav>
        </div>
            
        {/*<div className="flex justify-center">
          <InputLabel name="search" register={register} icon={lupa} />
        </div>*/}
        <div>
            <button type="button" className="m-4 font-bold cursor-pointer" onClick={() => navigate("/login")}>Iniciar sesión</button>
            {/* <button type="button" className="m-4 font-bold cursor-pointer" onClick={() => navigate("/register")}>Sign up</button> */}
        </div>
        
    </header>
    </>
  );
};