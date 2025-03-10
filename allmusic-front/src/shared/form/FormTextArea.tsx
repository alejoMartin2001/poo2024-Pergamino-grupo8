import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  rows?: number;
  cols?: number;
  name: string;
  text?: string;
  maxLength?: number;

  register: UseFormRegister<any>;
}

export const FormTextArea = ({ label, name, rows = 3, cols = 1, register, text, maxLength = 120 }: Props) => {
  return (
    <div className="relative w-full">
      {/* Textarea con peer */}
      <textarea
        className="peer block w-full rounded-md bg-[#1A1B25] px-3 pt-5 pb-2 text-white text-base focus:outline-none focus:ring-1 focus:ring-gray-500"
        id={name}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        placeholder=" " // 👈 Necesario para el label flotante
        {...register(name)}
      ></textarea>

      {/* Label flotante */}
      <label
        htmlFor={name}
        className="absolute left-3 top-3 text-gray-400 text-base transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-300"
      >
        {label}
      </label>

      {/* Texto opcional debajo */}
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  )
}