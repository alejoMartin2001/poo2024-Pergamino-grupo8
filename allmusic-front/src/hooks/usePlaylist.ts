import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useAlert } from "src/contexts/AlertProvider"
import { playlistIdGetAction, playlistIsPrivate } from "src/services/playlists/playlist-post-action"

export const usePlaylist = (playlist: number) => {

  const { showAlert } = useAlert();


  const playlistQuery = useQuery({
    queryKey: ["playlist"],
    queryFn: () => playlistIdGetAction(playlist),
  })

  const changePrivate = useMutation({
    mutationFn: () => playlistIsPrivate(playlist),
    onSuccess: (data) => {
      let message = data ? "¡Ahora solo tú podras ver la playlist!" : "¡Ahora tu playlists es pública!";
      showAlert("Configuración actualizada", message, "success");
      playlistQuery.refetch();
    },
    onError: (error: AxiosError) => {
      console.log(error);
    }
  });

  const handleChangePrivate = () => {
    console.log(playlist);
    changePrivate.mutate();
  }

  return {
    dataPlaylist: playlistQuery.data,
    handleChangePrivate
  }
}
