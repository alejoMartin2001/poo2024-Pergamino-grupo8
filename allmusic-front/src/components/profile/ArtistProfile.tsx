import { Check } from "lucide-react";
import album from "@images/album/20230607_190836.jpg"
import { GradientIcon } from "@shared/components";
import { MediaContainer, MediaSection } from "@shared/media";

interface ArtistProfileProps {
  name?: string;
}

const albums = [
  { image: album, title: "Album_1", subtitle: "Artist 1" },
  { image: album, title: "Album_2", subtitle: "Artist 2" },
  { image: album, title: "Album_3", subtitle: "Artist 1" },
  { image: album, title: "Album_4", subtitle: "Artist 2" },
];

export const ArtistProfile = ({ name = "Luna Vibes" }: ArtistProfileProps) => {
  return (
    <div className="flex flex-col text-white ">
      <div className="relative w-full h-80 bg-gradient-to-b from-gray-800 to-black">
        <img className="absolute inset-0 w-full h-full object-cover opacity-50" src={album} alt={name} />
        <div className="absolute bottom-8 left-16 max-sm:left-8">
          <p className="text-2xl font-medium bg-gradient-to-tr from-blue-500 to-[#48E5C2] bg-clip-text text-transparent flex items-center gap-2">
            <GradientIcon Icon={Check} size={24} fromColorHex="2196F3" toColorHex="48E5C2" /> Artista
          </p>
          <h1 className="text-5xl font-bold mb-5 max-lg:text-2xl">{name}</h1>
          <p className="w-1/2 italic max-lg:w-full max-lg:pr-15 max-sm:hidden">Con un estilo visual distintivo, sus videoclips presentan paisajes vibrantes que complementan su sonido único. Luna ha comenzado a destacar en festivales locales y su creciente popularidad la posiciona como una de las promesas más emocionantes de la nueva escena musical.</p>
        </div>
      </div>

      <MediaContainer title={`Álbumes de ${name}`}>
        <MediaSection data={albums} />
      </MediaContainer>
    </div>
  )
}