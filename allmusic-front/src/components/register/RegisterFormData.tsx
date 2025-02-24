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
        <div className="w-full">
          <label htmlFor="confirmarPassword" className="block text-sm font-medium">Confirmar contraseña</label>
          <input
            className="w-full rounded-md p-2 mt-1 bg-[#1A1B25]"
            id="confirmarPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!passwordValid && confirmPassword && <p className="mt-1 text-sm text-red-500">La contraseña no conincide</p>}
        </div>

      </div>
    </>
  )
}