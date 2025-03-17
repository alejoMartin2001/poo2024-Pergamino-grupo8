import { MediaContainer, MediaSection } from "@shared/media";
import { useAlbums } from "src/hooks/albums/useAlbums";


export const Explore = () => {

  const { allAlbums, isLoadingAll } = useAlbums();

  return (
    <div className="flex flex-col">
      <MediaContainer title="Álbumes Populares">
        <MediaSection data={allAlbums ?? []} isAlbum={true} isLoading={isLoadingAll}/>
      </MediaContainer>

      {/* <MediaContainer title="Playlists Destacadas">
        <MediaSection data={playlists} />
      </MediaContainer> */}
    </div>
  )
}