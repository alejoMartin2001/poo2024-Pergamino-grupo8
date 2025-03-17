import { useQuery } from "@tanstack/react-query"
import { albumById, albumsByArtist } from "src/services/albums/album-post-action";

const time = 1000 * 60 * 60; // 1 Hora.

export const useAlbumById = (album: number) => {
  // Queries.
  const albumIdQuery = useQuery({
    queryKey: ["album", album],
    queryFn: () => albumById(album),
    staleTime: time
  });

  return {
    albumData: albumIdQuery.data,
    refetch: albumIdQuery.refetch
  }
}


export const useAlbumByArtist = (username: string) => {
  const albumArtistQuery = useQuery({
    queryKey: ["albumsArtist", username],
    queryFn: () => albumsByArtist(username),
    staleTime: time,
    refetchOnWindowFocus: true,
  });

  return {
    albumsArtist: albumArtistQuery.data,
    refetch: albumArtistQuery.refetch
  }
}
