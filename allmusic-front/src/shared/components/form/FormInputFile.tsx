import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import avatar from '@images/avatars/admin-0.png';

interface Props {
  label: string;
  name: string;
  isArtist?: boolean;

  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

const avatarsEnthusiast = Array.from({ length: 9 }, (_, i) => `/src/images/avatars/admin-${i}.png`);

export const FormInputFile = ({ label, name, isArtist = false, register, setValue }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // Guardo solo el nombre de la imagen cargada
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setValue(name, file.name);
    }
  };

  // Solo guardo el nombre del avatar seleccionada
  const handleSelectAvatar = (avatarPath: string) => {
    const avatarName = avatarPath.split("/").pop();
    setPreview(avatarPath);
    setValue(name, avatarName);
    setShowMenu(false);
  };

  return (
    <div className="col-span-full">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-x-4">
        {preview ? (
          <img
            src={preview}
            alt="Avatar Preview"
            className="size-16 rounded-full object-cover "
          />
        ) : (
          <div className="size-16 flex items-center justify-center rounded-full ">
            <img src={avatar} />
          </div>
        )}

        <div className="relative">

          {!isArtist ? (
            <button
              type="button"
              className={`rounded-md 
                bg-[#db2777] px-4 py-2 
                text-sm font-semibold text-white shadow-sm
                focus:outline-none cursor-pointer
              `}
              onClick={() => setShowMenu(!showMenu)}
            >
              Seleccionar Avatar
            </button>
          ) : (
            <>
              <label
                htmlFor={name}
                className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none"
              >
                Subir foto
              </label>
              <input
                type="file"
                id={name}
                className="hidden"
                accept="image/*"
                {...register(name)}
                onChange={handleFileChange}
              />
            </>
          )}

          {!isArtist && showMenu && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-[#db2777] rounded-lg shadow-lg p-2 grid grid-cols-3 gap-3 z-10">
              {avatarsEnthusiast.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index}`}
                  className="size-12 rounded-full cursor-pointer hover:opacity-50"
                  onClick={() => handleSelectAvatar(avatar)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};