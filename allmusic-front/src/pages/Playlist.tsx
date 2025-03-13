
import { PlaylistCreate } from "@components/playlist/PlaylistCreate";
import { MediaContainer, MediaSection } from "@shared/media";
import { usePlaylist } from "src/hooks/usePlaylists";

export const Playlist = () => {
  const { allPlaylistsData, isLoadingAllPlaylist } = usePlaylist();
  console.log(allPlaylistsData);
  return (
    <div>
      <PlaylistCreate />
      <MediaContainer title="Mis playlists">
        <MediaSection isLoading={isLoadingAllPlaylist} data={allPlaylistsData ?? []}/>

      </MediaContainer>
    </div>
  );
};
