import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useAlert } from "src/contexts/AlertProvider"
import { playlistIdGetAction } from "src/services/playlists/playlist-post-action"
import { playlistIsPrivate } from "src/services/playlists/playlist-update-action";

// Este hook necesita un playlist ID.
export const usePlaylist = (playlist: number) => {

  const { showAlert } = useAlert();

  const playlistQuery = useQuery({
    queryKey: ["playlist", playlist],
    queryFn: () => playlistIdGetAction(playlist),
    staleTime: 1000 * 60 * 60
  })

  const changePrivate = useMutation({
    mutationFn: () => playlistIsPrivate(playlist),
    onSuccess: (data) => {
      let message = data ? "¡Ahora solo tú podras ver la playlist!" : "¡Ahora tu playlist es pública!";
      showAlert("Configuración actualizada", message, "success");
      playlistQuery.refetch();
    },
    onError: (error: AxiosError) => {
      console.log(error);
    }
  });

  const handleChangePrivate = () => {
    changePrivate.mutate();
  }

  return {
    // Datos.
    dataPlaylist: playlistQuery.data,

    // Loaders.
    loadingPrivate: changePrivate.isPending,

    // Funciones.
    handleChangePrivate
  }
}
