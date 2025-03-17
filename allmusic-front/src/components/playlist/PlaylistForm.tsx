import { LoaderSpinner } from "@shared/components";
import { FormInputText, FormTextArea } from "@shared/form";
import { useState } from "react";
import { usePlaylists } from "src/hooks/playlists/usePlaylists"

interface Props {
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const PlaylistForm = ({ setIsModalOpen }: Props) => {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    errors,
    isLoadingCreation,
    register,
    handleSubmit,
    onSubmit,
    // watch,
    // setValue,
  } = usePlaylists(setIsModalOpen);

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
          requiredMessage=""
        />
        <FormTextArea
          label="Descripción"
          name="description"
          register={register}
        />

        <input type="file" {...register("image")} accept="image/*" onChange={handleImageChange} className="p-2 border-2 rounded" />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded" />}

        <button
          type="submit"
          className="p-2 bg-[#db2777] hover:bg-[#db277887] text-white rounded-lg cursor-pointer transition"
        >Crear Playlist
        </button>
      </>}
    </form>
  );
};