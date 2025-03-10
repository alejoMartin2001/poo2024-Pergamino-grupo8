import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  type?: 'text' | 'email' | 'password';
  name: string;
  error?: FieldError;
  requiredMessage?: string;

  register: UseFormRegister<any>;
}

export const FormInputText = ({ label, type = 'text', name, register, error, requiredMessage }: Props) => {
  return (
    <div className="relative w-full">
      <input
        className="peer w-full rounded-md p-3 pt-5 mb-2 bg-[#1A1B25] text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
        type={type}
        id={name}
        placeholder=" "
        {...register(name, {
          required: requiredMessage,
          ...(type === "email" && {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Por favor ingresa un correo electrónico válido",
            },
          }),
        })}
      />

      <label
        htmlFor={name}
        className="absolute left-3 top-1 text-gray-400 text-xs transition-all 
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-300"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}