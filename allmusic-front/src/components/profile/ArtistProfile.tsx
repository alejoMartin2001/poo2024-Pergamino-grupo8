import { Check } from "lucide-react";
import { GradientIcon } from "@shared/components";
import { MediaContainer, MediaSection } from "@shared/media";
import { useAlbumByArtist } from "src/hooks/albums/useAlbum";
import { useParams } from "react-router";
import { useArtistUsername } from "src/hooks/users/useUser";


export const ArtistProfile = () => {

  const { usernameArtist } = useParams();

  const { albumsArtist } = useAlbumByArtist(usernameArtist ?? "");
  const { artistData} = useArtistUsername(usernameArtist ?? "");

  return (
    <div className="flex flex-col text-white ">
      <div className="relative w-full h-80 bg-gradient-to-b from-gray-800 to-black">
        <img className="absolute inset-0 w-full h-full object-cover opacity-50" src={artistData?.profilePicture} />
        <div className="absolute bottom-8 left-16 max-sm:left-8">
          <p className="text-2xl font-medium bg-gradient-to-tr from-blue-600 to-[#48E5C2] bg-clip-text text-transparent flex items-center gap-2">
            <GradientIcon Icon={Check} size={24} fromColorHex="2196F3" toColorHex="48E5C2" /> Artista
          </p>
          <h1 className="text-5xl font-bold mb-5 max-lg:text-2xl">{artistData?.artistName}</h1>
          <p className="w-1/2 italic max-lg:w-full max-lg:pr-15 max-sm:hidden">{artistData?.bio}</p>
        </div>
      </div>

      <MediaContainer title={`Álbumes de ${artistData?.artistName}`}>
        <MediaSection data={albumsArtist ?? []} isAlbum={true} />
      </MediaContainer>
    </div>
  )
}