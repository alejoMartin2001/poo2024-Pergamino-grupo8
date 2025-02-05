import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  error?: FieldError;
  requiredMessage?: string;

  register: UseFormRegister<any>; 
}

export const FormInputField = ({ label, type = 'text', name, register , error, requiredMessage}: Props) => {
  return (
    <div className="mb-2 w-full">
      <label className=" block text-sm font-medium" htmlFor={name}>{label}</label>
      <input 
        className=" w-full rounded-md p-2 mt-1 bg-[#1A1B25]" 
        type={type} 
        id={name}
        placeholder={label}
        {...register(name, requiredMessage ? {required: requiredMessage} : {})}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}