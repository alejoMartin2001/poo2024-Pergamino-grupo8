import { LoaderSpinner } from "@shared/components";
import { FormInputText } from "@shared/form";
import { FormInputDate } from "@shared/form/FormInputDate";
import { useEffect, useState } from "react";
import { useAlbumUpdate } from "src/hooks/albums/useAlbum";

interface Props {
  albumId: number;
  albumName: string;
  releaseDate: Date;
  image: string;
  setIsModalOpen?: (isModalOpen: boolean) => void
}

export const AlbumUpdateForm = ({ image = "", albumId, albumName, releaseDate, setIsModalOpen }: Props) => {

  const [preview, setPreview] = useState<File | null>(null);

  const {
    errors,
    isLoading,
    register,
    setValue,
    reset,
    handleSubmit,
    onSubmit,
  } = useAlbumUpdate(albumId, albumName, releaseDate, setIsModalOpen);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPreview(event.target.files[0]);
      setValue("image", event.target.files);
    }
  };


  useEffect(() => {
    reset({
      albumName,
      releaseDate,
      image: null
    });
  }, [albumName, releaseDate, reset]);


  return (
    <form onSubmit={handleSubmit((data) => {
      onSubmit(data);
    })}
    >
      {isLoading ?
        <div className="flex items-center justify-center h-full ">
          <LoaderSpinner />
        </div> :
        <div className="max-w-2xl mt-2 mx-auto text-white rounded-lg flex items-center gap-4 md:gap-6 max-md:flex-col">
          <label
            className="relative cursor-pointer w-44 h-44 bg-gray-800 rounded-md overflow-hidden 
            flex items-center justify-center
          "
          >
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {preview ? (
              <img src={URL.createObjectURL(preview)} alt="Playlist Cover" className="w-full h-full object-cover" />
            ) : (
              <img src={image} className="w-full h-full object-cover" />
            )}
          </label>

          <div className="flex-1 max-md:w-full">
            <FormInputText
              label="Titulo"
              name="albumName"
              register={register}
            />
            <FormInputDate
              label="Fecha de lanzamiento"
              name="releaseDate"
              register={register}
              error={errors.releaseDate}
              requiredMessage="La fecha es obligatoria"
            />
          </div>

        </div>}

      <div className="flex items-center justify-end gap-4 text-white max-lg:mt-3">
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 cursor-pointer rounded-3xl hover:bg-blue-800 font-medium"
        >
          Guardar
        </button>
      </div>

    </form>
  )
}