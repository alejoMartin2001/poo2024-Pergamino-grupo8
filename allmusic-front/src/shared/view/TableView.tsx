import { Clock, Ellipsis, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { usePlaylistSong } from "src/hooks/playlists/usePlaylist";
import { playlistsTable } from "src/interfaces/playlist-interface";
import { Songs } from "src/interfaces/song-interface";


interface Props {
  playlistId: number;
  isPlaylist: boolean
  songs: Songs[];
  playlistName?: playlistsTable[];
}


const handleSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return `${minutes}:${secondsRemaining.toString().padStart(2, '0')}`;
}

export const TableView = ({ songs, isPlaylist, playlistName, playlistId }: Props) => {

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<boolean>(false);

  const { onSubmitCreateSong, onSubmitRemoveSong } = usePlaylistSong(setOpenDropdown, setOpenSubmenu);

  console.log(songs)

  return (
    <div className="bg-transparent text-white p-6 rounded-xl w-full mb-20">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="p-3">#</th>
            <th className="p-3">Título</th>
            {!isPlaylist && <th className="p-3 max-lg:hidden">Género</th>}
            {isPlaylist && <th className="p-3 max-lg:hidden">Álbum</th>}
            <th className="p-3"><Clock size={16} /></th>
          </tr>
        </thead>
        <tbody>
          {
            songs.map((song, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800 transition">
                {/* # */}
                <td className="p-3 text-gray-400">{index + 1}</td>

                {/* Titulo */}
                <td className="p-3 flex items-center gap-2">
                  {isPlaylist && <img src={song.imageAlbum} alt={song.title} className="w-10 h-10 rounded-md object-cover" />}
                  <div className="flex flex-col">
                    <span className="font-semibold">{song.title}</span>
                    {isPlaylist && <span className="text-gray-400 text-sm">{song.artist?.join(", ")}</span>}
                  </div>
                </td>


                {!isPlaylist &&
                  <td className="p-3 max-lg:hidden">
                    <span className="text-gray-400 font-medium ">{song.genre}</span>
                  </td>
                }

                {isPlaylist &&
                  <td className="p-3 text-gray-400">
                    <Link to={`/album/${song.albumId}`} className="hover:underline hover:text-gray-400">
                      {song.albumName}
                    </Link>
                  </td>
                }

                <td className="p-3 ">
                  <span className="text-gray-400 ">{handleSeconds(song.duration)}</span>
                </td>

                <td >
                  <button
                    className="hover:text-green-400 transition p-1 hover:bg-gray-600 rounded-lg cursor-pointer"
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}                  >
                    <Ellipsis size={16} />
                  </button>

                  {openDropdown === index && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900  rounded-lg shadow-lg z-10">
                      {isPlaylist && (
                        <button
                          type="button"
                          className="w-full flex items-center p-2 hover:bg-gray-700"
                          onClick={() => onSubmitRemoveSong({ songId: song.songId, playlistId: playlistId })}
                        >
                          <Trash size={16} className="mr-2" />
                          Eliminar canción
                        </button>
                      )}
                      <button
                        className="w-full flex items-center p-2 hover:bg-gray-700"
                        onClick={() => setOpenSubmenu(!openSubmenu)}
                      >
                        <Plus size={16} className="mr-2" />
                        Agregar a playlist
                      </button>

                      {/* Submenú de Playlists */}
                      {openSubmenu && (
                        <div className="mt-1 border-t border-[#db2777]">
                          {playlistName?.map((playlist) => (

                            <button
                              key={playlist.playlistId}
                              type="button"
                              className="w-full p-2 hover:bg-gray-700"
                              onClick={() => {
                                onSubmitCreateSong({ playlistId: playlist.playlistId, songId: song.songId })
                                setOpenDropdown(null);
                                setOpenSubmenu(false);
                              }}
                            >
                              {playlist.playlistName}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </td>

              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}