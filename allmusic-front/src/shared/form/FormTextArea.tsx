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
      <textarea
        className={`peer w-full rounded-md p-3 pt-5 bg-[#1A1B25] text-white focus:outline-none focus:ring-1 focus:ring-gray-500`}
        id={name}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        placeholder=" "
        {...register(name)}
      ></textarea>

      <label
        htmlFor={name}
        className="absolute left-3 top-1 text-gray-400 text-xs transition-all 
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-300"
      >
        {label}
      </label>

      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  )
}