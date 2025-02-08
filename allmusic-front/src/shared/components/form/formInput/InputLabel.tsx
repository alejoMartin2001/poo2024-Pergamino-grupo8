import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputLabel {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  name: "username" | "email" | "password" | "search"; // Restringimos a los nombres válidos
  register: UseFormRegister<FieldValues>;
  icon?: string;
}

export const InputLabel = ({ label, type = "text", name, register, icon }: InputLabel) => {
  return (
    <div className="relative flex items-center">
      <label
        className="text-sm font-stretch-100% m-2 mb-1"
        htmlFor={name}>
        {label}
      </label>
      <img
        src={icon}
        alt="Icono"
        className="absolute left-6 h-5 w-5 opacity-75 cursor-pointer" />
      <input
        className="
              w-full
              font-bold
              rounded-md
              p-2
              pl-10 /* Aumentamos padding-left para que no se superponga con el icono */
              bg-[#1A1B25]
              focus:outline-none
            "
        type={type}
        id={name}
        placeholder={name}
        {...register(name)}
      />
    </div>

  )
}