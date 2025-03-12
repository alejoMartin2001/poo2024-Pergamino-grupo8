import { MediaSection } from "@shared/media";
import { usePlaylist } from "src/hooks/usePlaylist";

export const PlaylistCard = () => {
  const { allPlaylistsQuery } = usePlaylist();

  return (
    <MediaSection
      data={
        allPlaylistsQuery.data?.map((playlist) => ({
          image: playlist.imageUrl,
          title: playlist.title,
          subtitle: `By ${playlist.username}`,
        })) || []
      }
      isLoading={allPlaylistsQuery.isLoading}
    />
  );
};
