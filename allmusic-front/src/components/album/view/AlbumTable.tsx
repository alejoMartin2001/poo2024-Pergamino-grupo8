
import { Clock, Trash } from 'lucide-react';
import { useState } from 'react';
import { useAlert } from 'src/contexts/AlertProvider';
import { useAlbumAddSong } from 'src/hooks/albums/useAlbum';
import { SongAlbum } from 'src/interfaces/album-interface';

import { Modal } from '@shared/components';

import { Genre } from './genres';

const getMaxSongs = (type: string) => {
  switch (type) {
    case "Sencillo":
      return 1;
    case "EP":
      return 5;
    case "Álbum":
      return Infinity;
    default:
      return 0;
  }
};

const handleSeconds = (seconds: number): string => {
  const minuutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return `${minuutes}:${secondsRemaining.toString().padStart(2, '0')}`;
}

interface Props {
  albumId: number;
  albumType: string;

  isAddSongsOpen: boolean;
  setIsAddSongsOpen: (isAddSongsOpen: boolean) => void;
}


export const AlbumTable = ({ albumId, isAddSongsOpen, setIsAddSongsOpen, albumType }: Props) => {

  const [songs, setSongs] = useState<SongAlbum[]>([]);
  const [newSong, setNewSong] = useState<SongAlbum>({ title: "", duration: 0, genre: "" });
  const { showAlert } = useAlert();

  const { onSubmit } = useAlbumAddSong(albumId);

  const addSong = () => {
    if (songs.length >= getMaxSongs(albumType)) {
      showAlert("Límite alcanzado", `No puedes agregar más canciones a un álbum tipo ${albumType}.`, "warning");
      return;
    }

    if (newSong.title && newSong.duration > 0 && newSong.genre) {
      setSongs((prev) => [...prev, newSong]);
      setNewSong({ title: "", duration: 0, genre: "" });
      setIsAddSongsOpen(false);
    } else {
      showAlert("Datos inválidos", "Los campos no tienen datos", "info");
    }
  };

  const removeSong = (index: number) => {
    setSongs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-transparent text-white p-6 rounded-xl w-full">
      {songs.length <= 0 ?
        <div className="w-full p-4">
          <h1
            className="font-normal w-full  text-gray-300 bg-gray-900 p-2 rounded-xl italic"
          >Este álbum está vacío. Puedes agregarle canciones por única vez.
          </h1>
        </div> :
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">Título</th>
              <th className="p-3 max-lg:hidden">Género</th>
              <th className="p-3">
                <Clock size={16} />
              </th>
            </tr>
          </thead>
          <tbody>

            {songs.map((song, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{song.title}</td>
                <td className="p-3 max-lg:hidden">{song.genre}</td>
                <td className="p-3 ">{handleSeconds(song.duration)}</td>
                <td className="p-3">
                  <button onClick={() => removeSong(index)}>
                    <Trash size={16} className="hover:text-red-700 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {songs.length > 0 &&
        <div className='flex items-center justify-end'>
          <button
            type='button'
            onClick={() => onSubmit(songs)}
            className='p-3 bg-blue-600 mt-4 rounded-3xl font-medium cursor-pointer hover:bg-blue-700 transition'
          >
            Guardar cambios
          </button>
        </div>}

      <Modal
        isOpen={isAddSongsOpen}
        onClose={() => setIsAddSongsOpen(false)}
        title='Agregar canciones'
        size='large'
      >
        <div className="space-y-4">

          {/* Titulo de la canción */}
          <div className="relative w-full mt-4">
            <input
              className="peer w-full rounded-md p-3 pt-5 mb-2 bg-[#1A1B25] text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
              type='text'
              id={`title`}
              value={newSong.title}
              onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
              placeholder=" "
            />

            <label
              htmlFor={`title`}
              className="absolute left-3 top-1 text-gray-400 text-xs transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-300"
            >
              Titulo de la canción
            </label>
          </div>

          {/* Duración de la canción (Seg) */}
          <div className="relative w-full">
            <input
              className="peer w-full rounded-md p-3 pt-5 mb-2 bg-[#1A1B25] text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
              type='number'
              id={`duration`}
              value={newSong.duration}
              onChange={(e) => setNewSong({ ...newSong, duration: Number(e.target.value) })}
              placeholder=" "
            />

            <label
              htmlFor={`duration`}
              className="absolute left-3 top-1 text-gray-400 text-xs transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-300"
            >
              {`Duración de la canción (Segundos)`}
            </label>
          </div>



          <select
            value={newSong.genre}
            onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
            className="w-full p-2 rounded-md bg-[#1A1B25] text-white"
          >
            <option value="" disabled>Selecciona un género</option>
            {Object.values(Genre).map((genre) => (
              <option key={genre} value={genre} className="bg-gray-800 text-white">
                {genre}
              </option>
            ))}
          </select>
          <button
            type='button'
            onClick={addSong}
            className='w-full p-2 bg-blue-600 hover:bg-blue-700
              cursor-pointer
              rounded-3xl mt-2 text-white font-medium'
          >Añadir canción
          </button>
        </div>

      </Modal>
    </div>
  )
}