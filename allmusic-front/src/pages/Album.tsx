
import { AlbumCreate } from "@components/album/AlbumCreate";
import { MediaContainer, MediaSection } from "@shared/media";
import { useAlbums } from "src/hooks/albums/useAlbums";

export const Album = () => {

  const { albumsMeData, isLoadingAlbumsMe } = useAlbums();

  return (
    <div className="flex flex-col text-white">
      <AlbumCreate />

      {(isLoadingAlbumsMe ||  albumsMeData!.length > 0) && 
      <MediaContainer title="Mis Álbumes">
        <MediaSection isLoading={isLoadingAlbumsMe} data={albumsMeData ?? []} isAlbum={true} />
      </MediaContainer>
      }
    </div>
  );
};