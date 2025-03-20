import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAlert } from "src/contexts/AlertProvider"
import { PlaylistSong, PlaylistUpdateForm } from "src/interfaces/playlist-interface";
import { playlistDelSongAction } from "src/services/playlists/playlist-del-action";
import { playlistDeleteAction } from "src/services/playlists/playlist-delete-action";
import { playlistAddSongAction, playlistIdGetAction } from "src/services/playlists/playlist-post-action"
import { playlistIsPrivate, playlistUpdateAction } from "src/services/playlists/playlist-update-action";

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

export const usePlaylistUpdate = (
  playlistId: number, 
  playlistTitle: string, 
  playlistDescription: string,
  setIsModalOpen?: (isModalOpen: boolean) => void
) => {

  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors}
  } = useForm<PlaylistUpdateForm>({
    defaultValues: {
      title: playlistTitle,
      description: playlistDescription,
      image: null
    }
  });

  const updatePlaylist = useMutation({
    mutationFn: ({ playlistId, update }: {playlistId: number; update: FormData}) => 
      playlistUpdateAction(playlistId, update),
    onSuccess: () => {
      setIsModalOpen && setIsModalOpen(false);
      showAlert("¡Se actualizó tu playlist!", "", "success")
      queryClient.invalidateQueries({ queryKey: ["playlist"] })
    }
  })

  const onSubmit = (data: PlaylistUpdateForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && data.image.length > 0){
      formData.append("image", data.image[0]);
    }

    updatePlaylist.mutate({ playlistId, update: formData });
  }


  return {
    errors,
    isLoadingUpdate: updatePlaylist.isPending,

    onSubmit,
    register,
    handleSubmit,
    reset,
    setValue,
  }
}

export const usePlaylistSong = (
  setOpenDropdown: (openDropdown: number | null) => void, 
  setOpenSubmenu: (openSubmenu: boolean) => void,


) => {

  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const addSongPlaylist = useMutation({
    mutationFn: playlistAddSongAction,
    onSuccess: () => {
      showAlert(`Se agrego la canción a la playlist`, "", "success");
      setOpenDropdown(null);
      setOpenSubmenu(false);
      queryClient.invalidateQueries({ queryKey: ["playlist"] })
    },
    onError: (error: AxiosError) => {
      let message = "Hubo un error en la agregación";
      console.log(error);

      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string };
        message = errorData.message || message;
      }

      showAlert("Error en agregar una canción en la playlist", message, "error");
    }
  });

  const addRemovePlaylist = useMutation({
    mutationFn: playlistDelSongAction,
    onSuccess: () => {
      showAlert(`Se eliminó la canción de la playlist`, "", "success");
      setOpenDropdown(null);
      setOpenSubmenu(false);
      queryClient.invalidateQueries({ queryKey: ["playlist"] })
    },
    onError: (error: AxiosError) => {
      let message = "Hubo un error en la agergación";
      console.log(error);

      if (error.response && error.response.data) {
        const errorData = error.response.data as { message?: string };
        message = errorData.message || message;
      }

      showAlert("Error en agregar una canción en la playlist", message, "error");
    }
  });


  const onSubmitCreateSong = (data: PlaylistSong) => {
    console.log(data)
    addSongPlaylist.mutate(data);
  }

  const onSubmitRemoveSong = (data: PlaylistSong) => {
    addRemovePlaylist.mutate(data);
  }
  return {
    isLoadingAddSong: addSongPlaylist.isPending,
    isLoadingRemoveSong: addRemovePlaylist.isPending,

    onSubmitCreateSong,
    onSubmitRemoveSong
  }
}

export const usePlaylistRemove = (playlistId: number) => {

  const queryClient = useQueryClient();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const playlistDelete = useMutation({
    mutationFn: () => playlistDeleteAction(playlistId),
    onSuccess: () => {
      navigate("/playlists");
      showAlert("Playlist eliminado", "La playlist ha sido eliminado correctamente.", "success");
      queryClient.invalidateQueries({ queryKey: ["playlist"] });
      queryClient.invalidateQueries({ queryKey: ["allPlaylistMe"] });
      queryClient.invalidateQueries({ queryKey: ["AllFavotires"] });

    }
  });
  
  const onDeletePlaylist = () => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta playlist?");
    if (confirmDelete) {
      showAlert("Álbum eliminado", "El álbum ha sido eliminado correctamente.", "warning", 5000);
      playlistDelete.mutate(); // Llamas a la mutación para eliminar el álbum
    }
  }

  return {
    onDeletePlaylist
  }
}
