// AlbumOptions.tsx

import { GradientIcon, Modal } from "@shared/components";
import { Bookmark, BookmarkCheck, Pencil, SquarePlus, Trash } from "lucide-react";
import { AlbumUpdateForm } from "../form/AlbumUpdateForm";
import { useState } from "react";
import { useFavorites } from "src/hooks/useFavorites";
import { useAlbums } from "src/hooks/albums/useAlbums";

interface Props {
  images: string;
  albumName: string;
  releaseDate: Date;
  albumId: number;
  isSongs: boolean;
  isOwner: boolean;
  setIsAddSongsOpen: (isAddSongsOpen: boolean) => void;
}

export const AlbumOptions = ({
  images = "",
  albumId,
  releaseDate,
  albumName,
  isSongs = false,
  isOwner,
  setIsAddSongsOpen
}: Props) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isAlbumFavorite, onSubmitCreate, onSubmitRemove } = useFavorites(undefined, albumId);
  const { onDeleteAlbum } = useAlbums(); // Obtienes la función para eliminar álbum

  return (
    <div className="flex items-center justify-between px-10 py-5 w-full">
      <div className='flex gap-7 text-gray-400'>
        <div
          className="cursor-pointer "
          onClick={() => isAlbumFavorite ? onSubmitRemove({albumId, playlistId: null}) : onSubmitCreate({albumId, playlistId: null})}
        >
          {!isAlbumFavorite ? <Bookmark /> : <GradientIcon Icon={BookmarkCheck} fromColorHex="db2777" toColorHex="3182ce" size={24} />}
        </div>

        {isOwner && (
          <button
            className='cursor-pointer hover:text-white'
            onClick={() => setIsModalOpen(true)}
            title="Editar álbum"
          >
            <Pencil />
          </button>
        )}

        {isOwner && !isSongs && (
          <div
            className="cursor-pointer hover:text-white"
            onClick={() => setIsAddSongsOpen(true)}
            title="Agregar canciones"
          >
            <SquarePlus />
          </div>
        )}

        {isOwner && (
          <button
            className="cursor-pointer hover:text-red-700"
            title="Eliminar álbum"
            onClick={() => onDeleteAlbum(albumId)} // Llamas a la función onDeleteAlbum
          >
            <Trash />
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Álbum"
        size="large"
      >
        <AlbumUpdateForm
          albumId={albumId}
          albumName={albumName}
          image={images}
          releaseDate={releaseDate}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
    </div>
  );
};
