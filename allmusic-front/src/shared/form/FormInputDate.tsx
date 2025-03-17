import { Calendar } from "lucide-react";
import { FieldError, UseFormRegister } from "react-hook-form"

interface Props {
  label: string,
  name: string,
  error?: FieldError,
  requiredMessage?: string;

  register: UseFormRegister<any>;
}

export const FormInputDate = ({ label, name, register, error, requiredMessage }: Props) => {

  const openDatePicker = () => {
    const input = document.getElementById("releaseDate") as HTMLInputElement;
    if (input) {
      input.showPicker?.();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="date"
        id={name}
        {...register(name, { required: requiredMessage})}
        className="peer w-full rounded-md p-3 pt-5 pr-10 bg-[#1A1B25] text-white focus:outline-none focus:ring-1 focus:ring-gray-500 appearance-none"
        placeholder=" "
      />

      <label
        htmlFor="releaseDate"
        className="absolute left-3 top-1 text-gray-400 text-xs transition-all 
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-300"
      >
        {label}
      </label>

      <Calendar
        className="absolute right-3 top-4 w-5 h-5 text-gray-400 peer-focus:text-blue-500 cursor-pointer"
        onClick={openDatePicker}
      />

      {error && (
        <span className="text-red-500 text-sm">{error.message}</span>
      )}
    </div>
  )
}