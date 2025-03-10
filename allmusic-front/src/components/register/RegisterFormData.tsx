import { FormInputText } from "@shared/form";
import { useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { UserRequestDto } from "src/interfaces/user-interface";

interface Props {
  errors: FieldErrors<UserRequestDto>;
  confirmPassword: string;
  passwordValid: boolean;

  setPasswordValid: (passwordValid: boolean) => void;
  setConfirmPassword: (confirmPassword: string) => void;

  register: UseFormRegister<UserRequestDto>;
  watch: UseFormWatch<UserRequestDto>;
}

export const RegisterFormData = ({
  errors,
  confirmPassword,
  passwordValid,
  register,
  setConfirmPassword,
  setPasswordValid,
  watch,
}: Props) => {


  useEffect(() => {
    const password = watch("password") || "";
    setPasswordValid(confirmPassword === password);
  }, [confirmPassword, watch("password")]);

  return (
    <>
      <div className="mt-5">
        <FormInputText
          label="Nombre de usuario"
          name="username"
          register={register}
          error={errors.username}
          requiredMessage="El nombre de usuario es obligatorio."
        />
      </div>

      <div className="flex gap-3 mt-5">
        <FormInputText
          type="password"
          label="Contraseña"
          name="password"
          register={register}
          error={errors.password}
          requiredMessage="La contraseña es obligatoria."
        />
        <div className="relative w-full">
          <input
            className="peer w-full rounded-md p-3 pt-5 mb-2 bg-[#1A1B25] text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
            id="confirmarPassword"
            type="password"
            placeholder=" "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label 
            htmlFor="confirmarPassword" 
            className="absolute left-3 top-1 text-gray-400 text-xs transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
              peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-300
            "
            >Confirmar contraseña</label>
          {!passwordValid && confirmPassword && <p className="text-sm text-red-500">La contraseña no conincide</p>}
        </div>

      </div>
    </>
  )
}