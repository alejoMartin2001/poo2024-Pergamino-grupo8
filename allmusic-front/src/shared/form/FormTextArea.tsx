import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  rows?: number;
  cols?: number;
  name: string;
  text?: string;

  register: UseFormRegister<any>;
}

export const FormTextArea = ({ label, name, rows = 3, cols = 1, register , text}: Props) => {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="block text-sm/6 font-medium">{label}</label>
      <div className="mt-2">
        <textarea
          className="block w-full rounded-md bg-[#1A1B25] px-3 py-1.5 text-base  "
          id={name}
          rows={rows}
          cols={cols}
          {...register(name)}
          ></textarea>
      </div>
      {text && <p className="mt-3 text-sm/6 text-gray-600">{text}</p>}
    </div>
  )
}