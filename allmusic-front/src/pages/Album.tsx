
import { AlbumCreate } from "@components/album/AlbumCreate";
import { MediaContainer, MediaSection } from "@shared/media";
import { useAlbum } from "src/hooks/useAlbums";

export const Album = () => {

  const { allAlbumsData, isLoadingAlbumsMe } = useAlbum();

  console.log(allAlbumsData)
  return (
    <div className="flex flex-col text-white">
      <AlbumCreate />
      <MediaContainer title="Mis Álbumes">
        <MediaSection isLoading={isLoadingAlbumsMe} data={allAlbumsData ?? []} isAlbum={true} />

      </MediaContainer>
    </div>
  );
};