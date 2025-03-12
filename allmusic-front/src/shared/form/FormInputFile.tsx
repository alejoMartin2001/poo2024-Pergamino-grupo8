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

// const avatarsEnthusiast = Array.from({ length: 9 }, (_, i) => `/src/images/avatars/admin-${i}.png`);

export const FormInputFile = ({ label, name, isArtist = false, register }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Guardo sólo el nombre de la imagen cargada
  // TODO: Si no se envia una imagen, se envia un Archivo File (Error).

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files;
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file[0]);
  //     setPreview(imageUrl);
  //   }
  // };
  

  return (
    <div className="col-span-full">
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
            <label
              htmlFor={name}
              className={`cursor-pointer rounded-md 
                  ${isArtist ? "bg-blue-600 hover:bg-blue-500" : "bg-[#db2777] hover:bg-[#db2778c7]"} 
                  px-4 py-2 text-sm font-semibold 
                  text-white shadow-sm focus:outline-none`
              }
            >
              Subir foto
            </label>
            <input
              type="file"
              id={name}
              className="hidden"
              accept="image/*"
              {...register(name)}
              // onChange={handleFileChange}
            />
        </div>
      </div>
    </div>
  );
};