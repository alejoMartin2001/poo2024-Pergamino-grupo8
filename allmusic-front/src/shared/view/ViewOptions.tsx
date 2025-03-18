import { GradientIcon, Modal } from "@shared/components";
import { FormInputText, FormTextArea } from "@shared/form";
import { Bookmark, BookmarkCheck, Lock, LockOpen, Pencil, Play, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFavorites } from "src/hooks/useFavorites";
import { PlaylistFormData } from "src/interfaces/playlist-interface";

interface Props {
  images?: string;
  isAlbum?: boolean;
  isPrivate?: boolean;
  playlistId: number;

  handleChangePrivate: () => void;
}

export const ViewOptions = ({ images = "", isAlbum = false, isPrivate = false, playlistId, handleChangePrivate }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { register } = useForm<PlaylistFormData>();

  const { isPlaylistFavorite, onSubmitCreate, onSubmitRemove } = useFavorites(playlistId, undefined);

  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  console.log(isPrivate);
  return (
    <div className='flex items-center justify-between px-10 py-5'>
      <div className="flex gap-7 text-gray-300">

        <div
          className="cursor-pointer "
          onClick={() => isPlaylistFavorite ? onSubmitRemove({ albumId: null, playlistId }) : onSubmitCreate({ albumId: null, playlistId })}
        >
          {!isPlaylistFavorite ? <Bookmark /> : <GradientIcon Icon={BookmarkCheck} fromColorHex="db2777" toColorHex="3182ce" size={24} />}
        </div>

        <button
          className='cursor-pointer hover:text-white'
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil />
        </button>
        {!isAlbum &&
          <button
            className='cursor-pointer hover:text-white'
            onClick={handleChangePrivate}
          >
            {isPrivate ? <Lock /> : <LockOpen />}
          </button>
        }
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Información"
        size="large"
      >
        <div className="max-w-2xl mt-2 mx-auto text-white rounded-lg flex items-center gap-4 md:gap-6 max-md:flex-col">
          <label
            className="relative cursor-pointer w-44 h-44 bg-gray-800 rounded-md overflow-hidden 
              flex items-center justify-center
            "
          >
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Playlist Cover" className="w-full h-full object-cover" />
            ) : (
              <img src={images} className="w-full h-full object-cover" />
            )}
          </label>

          <div className="flex-1 flex flex-col max-md:w-full">
            <FormInputText label="Titulo" name="title" register={register} />
            <FormTextArea label="Descripción" name="description" register={register} />
          </div>
        </div>

      </Modal>

      <div className='flex gap-7 text-gray-300 hover:text-white'>
        <button >
          <Search />
        </button>
      </div>
    </div>
  );
};


{/* <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg flex gap-6">
  <label className="relative cursor-pointer w-44 h-44 bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
    {image ? (
      <img src={URL.createObjectURL(image)} alt="Playlist Cover" className="w-full h-full object-cover" />
    ) : (
      <span className="text-gray-500">Seleccionar imagen</span>
    )}
  </label>
  <div className="flex-1 flex flex-col gap-4">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full bg-gray-800 border-none p-2 rounded text-white focus:outline-none text-xl font-bold"
    />
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full bg-gray-800 border-none p-2 rounded text-white focus:outline-none resize-none h-24"
      placeholder="Añadir una descripción"
    />
  </div>
</div> */}