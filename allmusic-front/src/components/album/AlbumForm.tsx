import { LoaderSpinner } from "@shared/components";
import { FormInputText } from "@shared/form";
import { FormInputDate } from "@shared/form/FormInputDate";
import { useState } from "react";
import { useAlbums } from "src/hooks/albums/useAlbums";

interface Props {
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const AlbumForm = ({ setIsModalOpen }: Props) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [albumType, setAlbumType] = useState("");

  const {
    errors,
    isLoadingCreation,
    register,
    handleSubmit,
    onSubmit,
    // watch,
    // setValue,
  } = useAlbums(setIsModalOpen, albumType);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="flex flex-col gap-4 p-4 bg-transparent rounded-lg text-gray-400"
    >
      {isLoadingCreation ?
        <div className="flex items-center justify-center h-max">
          <LoaderSpinner />
        </div> :
        <>

          <FormInputText
            label="Titulo"
            name="title"
            register={register}
            error={errors.title}
            requiredMessage="Escriba un titulo"
          />

          <FormInputDate
            label="Fecha de lanzamiento"
            name="releaseDate"
            register={register}
            error={errors.releaseDate}
            requiredMessage="La fecha es obligatoria"
          />

          {/* Tipo de Álbum */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <span className="font-medium">Tipo de álbum:</span>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="single"
                checked={albumType === "single"}
                onChange={(e) => setAlbumType(e.target.value)}
              />
              Sencillo
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="ep"
                checked={albumType === "ep"}
                onChange={(e) => setAlbumType(e.target.value)}
              />
              EP
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="lp"
                checked={albumType === "lp"}
                onChange={(e) => setAlbumType(e.target.value)}
              />
              Álbum Completo
            </label>
          </div>

          <input type="file" {...register("image")} accept="image/*" onChange={handleImageChange} className="p-2 border-2 rounded" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded" />}

          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg cursor-pointer transition"
          >Crear Álbum
          </button>
        </>
      }
    </form>
  );
}