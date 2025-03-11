import { useQuery } from "@tanstack/react-query"
import { albumGetAction } from "src/services/albums/album-get-action"


export const useAlbum = () => {

  const allAlbumsQuery = useQuery({
    queryKey: ["allAlbum"],
    queryFn: albumGetAction,
  })

  return {
    allAlbumsQuery,
  }
}
