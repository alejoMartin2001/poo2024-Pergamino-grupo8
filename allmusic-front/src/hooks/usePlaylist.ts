import { useQuery } from "@tanstack/react-query"
import { playlistGetAction } from "src/services/playlists/playlist-get-action"

export const usePlaylist = () => {
  const allPlaylistsQuery = useQuery({
    queryKey: ["allPlaylist"],
    queryFn: playlistGetAction,
  })

  return {
    allPlaylistsQuery
  }
}