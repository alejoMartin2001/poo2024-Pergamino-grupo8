import { useQuery } from "@tanstack/react-query"
import { albumById } from "src/services/albums/album-post-action";

export const useAlbum = (album: number) => {

  const albumQuery = useQuery({
    queryKey: ["album"],
    queryFn: () => albumById(album)
  });

  return {
    albumData: albumQuery.data
  }
}
