import { LoaderSpinner, Modal } from "@shared/components"
import { Plus } from "lucide-react"
import { useState } from "react";
import { usePlaylist } from "src/hooks/usePlaylist";
import { PlaylistForm } from "./PlaylistForm";
import { FormInputText, FormTextArea } from "@shared/form";


interface Props {

}

export const PlaylistCreate = ({ }: Props) => {

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    errors,
    isLoading,
    register,
    handleSubmit,
    onSubmit,
    // watch,
    // setValue,
  } = usePlaylist(setIsModalOpen);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-7xl mx-auto mb-4 max-2xl:px-4 py-6 ">
        <div
          className="w-48 p-3 bg-gray-800 rounded-lg transition duration-200 cursor-pointer
           text-gray-600 hover:text-gray-400"
          onClick={() => setIsModalOpen(true)}
        >
          <div className=" flex items-center justify-center size-full">
            <Plus className="w-48 h-48 bg-transparent" />
          </div>
          <h3 className="text-center font-medium">Crear playlist</h3>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear playlist"
        size="large"
      >
        {/* <PlaylistForm setIsModalOpen={setIsModalOpen}/> */}

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-4 p-4 bg-transparent rounded-lg text-gray-400"
        >
          {isLoading ?
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
      </Modal>
    </div>
  )
}