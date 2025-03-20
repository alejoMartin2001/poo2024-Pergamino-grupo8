import { GradientIcon, LoaderSpinner, Modal } from "@shared/components";
import { FormInputText, FormTextArea } from "@shared/form";
import { Bookmark, BookmarkCheck, Lock, LockOpen, Pencil, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlaylistRemove, usePlaylistUpdate } from "src/hooks/playlists/usePlaylist";
import { useFavorites } from "src/hooks/useFavorites";

interface Props {
  images?: string;
  title: string;
  description: string;

  isPrivate?: boolean;
  loadingPrivate: boolean
  isOwner: boolean;

  playlistId: number;

  handleChangePrivate: () => void;
}

export const ViewOptions = ({ images = "", isOwner, title, description, isPrivate = false, playlistId, loadingPrivate, handleChangePrivate }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    isLoadingUpdate,
    register,
    reset,
    setValue,
    handleSubmit,
    onSubmit

  } = usePlaylistUpdate(playlistId, title, description, setIsModalOpen);

  const { isLoadingPlaylist, isPlaylistFavorite, onSubmitCreate, onSubmitRemove } = useFavorites(playlistId, undefined);

  const { onDeletePlaylist } = usePlaylistRemove(playlistId);

  const [preview, setPreview] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPreview(event.target.files[0]);
      setValue("image", event.target.files);
    }
  };

  useEffect(() => {
    reset({
      title,
      description,
      image: null
    });
  }, [title, description, reset]);

  return (
    <div className='flex items-center justify-between px-10 py-5'>
      <div className="flex gap-7 text-gray-300">

        {isLoadingPlaylist ?
          <div className="flex items-center justify-center h-max">
            <LoaderSpinner size={18} />
          </div> :
          <div
            className="cursor-pointer "
            onClick={() => isPlaylistFavorite ? onSubmitRemove({ albumId: null, playlistId }) : onSubmitCreate({ albumId: null, playlistId })}
          >
            {!isPlaylistFavorite ? <Bookmark /> : <GradientIcon Icon={BookmarkCheck} fromColorHex="db2777" toColorHex="3182ce" size={24} />}
          </div>
        }

        <button
          className='cursor-pointer hover:text-white'
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil />
        </button>
        {isOwner &&
          (loadingPrivate ?
            <div className="flex items-center justify-center h-max">
              <LoaderSpinner size={18} />
            </div> :
            <button
              className='cursor-pointer hover:text-white'
              onClick={handleChangePrivate}
              title={`${isPrivate ? "Hacer pública" : "Hacer privada"}`}
            >
              {isPrivate ? <Lock /> : <LockOpen />}
            </button>
          )
        }

        {isOwner &&
          <button
            type="button"
            className="cursor-pointer hover:text-red-700"
            title="Eliminar playlist"
            onClick={onDeletePlaylist}
          >
            <Trash />
          </button>
        }
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Información"
        size="large"
      >
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          {isLoadingUpdate ?
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
                  <img src={images} className="w-full h-full object-cover" />
                )}
              </label>

              <div className="flex-1 flex flex-col max-md:w-full">
                <FormInputText label="Titulo" name="title" register={register} />
                <FormTextArea label="Descripción" name="description" register={register} />
              </div>
            </div>
          }

          <div className="flex items-center justify-end gap-4 text-white max-lg:mt-3">
            <button
              type="submit"
              className="py-2 px-4 bg-[#db2777] cursor-pointer rounded-3xl hover:bg-[#db277887] font-medium"
            >
              Guardar
            </button>
          </div>

        </form>

      </Modal>

      <div className='flex gap-7 text-gray-300 hover:text-white'>
        <button >
          <Search />
        </button>
      </div>
    </div>
  );
};