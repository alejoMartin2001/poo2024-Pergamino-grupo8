import { PlaylistCard } from "@components/playlist/PlaylistCard";
import { PlaylistCreate } from "@components/playlist/PlaylistCreate";
import { MediaContainer } from "@shared/media";

export const Playlist = () => {
  return (
    <div>
      <PlaylistCreate />
      {/* <MediaContainer title="Playlists" children={<PlaylistCard />} /> */}
    </div>
  );
};
