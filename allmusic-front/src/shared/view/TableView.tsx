import { Clock, Ellipsis } from "lucide-react";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

interface SpotifyTableProps {
  songs: Song[];
}
export const TableView = ({ songs }: SpotifyTableProps) => {
  return (
    <div className="bg-transparent text-white p-6 rounded-xl w-full">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="p-3">#</th>
            <th className="p-3">Título</th>
            <th className="p-3 max-lg:hidden">Álbum</th>
            <th className="p-3 max-lg:hidden"><Clock size={16} /></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={song.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
              <td className="p-3 text-gray-400">{index + 1}</td>


              <td className="p-3 flex items-center gap-2">
                <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-md object-cover" />
                <div className="flex flex-col">
                  <span className="font-semibold">{song.title}</span>
                  <span className="text-gray-400 text-sm">{song.artist}</span>
                </div>
              </td>

              <td className="p-3 text-gray-400 max-lg:hidden">{song.album}</td>

              <td className="p-3 max-lg:hidden">
                <span className="text-gray-400 ">{song.duration}</span>
              </td>

              <td >
                <button className="hover:text-green-400 transition p-1 hover:bg-gray-600 rounded-lg cursor-pointer">
                  <Ellipsis size={16} />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}