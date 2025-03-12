import { SettingProfile } from "@components/profile/SettingProfile";
import { useUser } from "src/hooks/useUserUpdate";

export const Setting = () => {
  const { register, errors, handleSubmit,onSubmit } = useUser();

  return (
    <div className="flex justify-center mt-12 mb-12 bg-transparent">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SettingProfile register={register} errors={errors} />
      </form>
    </div>
  );
};
export { SettingProfile };

