import { useEffect, useState } from 'react';
import { Vibrant } from "node-vibrant/browser";
import { Songs } from 'src/interfaces/song-interface';

interface Props {
  image: string;
  title: string;
  type: string;
  ownerName: string;

  date?: Date;
  songs: Songs[];
  isPlaylist: boolean;
}

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = [];

  if (hours > 0) {
    result.push(`${hours} hora${hours > 1 ? 's' : ''}`);
    if (minutes > 0) result.push(`${minutes} minuto${minutes > 1 ? 's' : ''}`);
  } else {
    if (minutes > 0) result.push(`${minutes} minuto${minutes > 1 ? 's' : ''}`);
    if (remainingSeconds > 0) result.push(`${remainingSeconds} segundo${remainingSeconds > 1 ? 's' : ''}`);
  }

  return result.length > 0 ? result.join(', ') : '0 segundos';
}

const getYearDate = (releaseDate: Date) => {
  const date = new Date(releaseDate); // Formato YYYY-MM-DD
  const dateString = date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  return dateString.split("/")[2];
}

const songsSize = (songs: Songs[]) => {
  return `${songs.length} ${songs.length > 1 ? "canciones" : "canción"}`;
}


export const ViewBanner = ({ image, title, type, ownerName, isPlaylist, songs, date }: Props) => {

  const [songsDuration, setSongsDuration] = useState<number>(0);
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  // Se obtiene el color más llamativo de la portada del Álbum/Playlist.
  useEffect(() => {
    const getDominantColor = async () => {
      const vibrant = await Vibrant.from(image).getPalette();
      const dominantSwatch = vibrant.Vibrant;

      if (dominantSwatch) {
        setDominantColor(dominantSwatch.hex);
      }
    };

    getDominantColor();
  }, [image]);

  useEffect(() => {
    setSongsDuration(songs?.reduce((total, song) => total + song.duration, 0));
  }, [songs])

  return (
    <div
      className="relative flex flex-col md:flex-row items-center md:items-end bg-gradient-to-b 
      from-gray-900 to-black p-6 md:p-10 gap-4 md:gap-6"
      style={{ background: `linear-gradient(180deg, ${dominantColor} 0%, black 100%)` }}
    >
      <img
        src={image}
        className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 object-cover shadow-2xl rounded-md"
      />
      <div className="flex flex-col text-center md:text-left">
        <span className="text-sm uppercase font-semibold text-gray-300">{type}</span>
        <h1 className="text-3xl md:text-7xl font-bold text-white mt-2 mb-2">{title}</h1>
        <div className='flex items-center text-gray-300'>
          <p className=" text-sm md:text-base mt-1">Hecho por <span className="font-semibold">{ownerName}</span>
            {` ${!isPlaylist && date ? "- " + getYearDate(date) : ""} - ${songsSize(songs)}, ${formatDuration(songsDuration)}`}
          </p>
        </div>
      </div>
    </div>
  )
}