
import { PlaylistCreate } from "@components/playlist/PlaylistCreate";
import { MediaContainer, MediaSection } from "@shared/media";
import { usePlaylists } from "src/hooks/playlists/usePlaylists";

export const Playlist = () => {
  const { allPlaylistsData, isLoadingAllPlaylist } = usePlaylists();
  
  return (
    <div>
      <PlaylistCreate />
      {( isLoadingAllPlaylist || allPlaylistsData!.length > 0 ) && <MediaContainer title="Mis playlists">
        <MediaSection isLoading={isLoadingAllPlaylist} data={allPlaylistsData ?? []}/>

      </MediaContainer>}
    </div>
  );
};
