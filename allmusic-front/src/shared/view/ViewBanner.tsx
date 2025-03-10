import { useEffect, useState } from 'react';
import { Vibrant } from "node-vibrant/browser";

interface Props {
  image: string;
  title: string;
}

export const ViewBanner = ({ image, title }: Props) => {

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
        <span className="text-sm uppercase font-semibold text-gray-300">{title}</span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">Future Bass</h1>
        <p className="text-gray-300 text-sm md:text-base mt-1">Hecho por <span className="font-semibold">Enzo Villanueva</span></p>
      </div>
    </div>
  )
}