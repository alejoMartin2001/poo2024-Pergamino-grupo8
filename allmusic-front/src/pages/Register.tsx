import { RegisterForm } from "@components/register/RegisterForm"

export const Register = () => {
  return (
    <div className="flex h-full w-full text-white">
      <div className="w-full flex items-center justify-center bg-[#1A1B25]">
        <RegisterForm />
      </div>
    </div>
  )
}