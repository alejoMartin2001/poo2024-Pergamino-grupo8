import { PlaylistCard } from "@components/playlist/PlaylistCard";
import { MediaContainer } from "@shared/media";

export const Playlist = () => {
  return (
    <div>
      <MediaContainer title="Playlists" children={<PlaylistCard />} />
    </div>
  );
};
