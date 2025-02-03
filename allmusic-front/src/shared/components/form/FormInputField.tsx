import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;

  register: UseFormRegister<FieldValues>; 
}

export const FormInputField = ({ label, type = 'text', name, register}: Props) => {
  return (
    <div className="mb-2">
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <input 
        className="w-full rounded-md p-2 mt-1 bg-[#1A1B25]" 
        type={type} 
        id={name} 
        placeholder={label}
        {...register(name)}
      />
    </div>
  )
}