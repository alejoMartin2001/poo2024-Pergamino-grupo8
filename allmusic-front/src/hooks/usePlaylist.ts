import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useAlert } from "src/contexts/AlertProvider";
import { PlaylistFormData } from "src/interfaces/playlist-interface";
import { playlistGetAction } from "src/services/playlists/playlist-get-action";
import { playlistCreateAction } from "src/services/playlists/playlist-post-action";


export const usePlaylist = ( setIsModalOpen?: (isModalOpen: boolean) => void ) => {

  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<PlaylistFormData>();


  const allPlaylistsQuery = useQuery({
    queryKey: ["allPlaylist"],
    queryFn: playlistGetAction,
    staleTime: 1000 * 60 * 60,
  })

  const mutation = useMutation({
    mutationFn: playlistCreateAction,
    onSuccess: () => {
      setIsModalOpen && setIsModalOpen(false);
      showAlert("Playlist Creada", "¡Ahora puedes añadirle las canciones que te gustan!", "success");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      showAlert("Error al crear una playlist", "Algo", "error")
    }
  });

  const onSubmit = (data: PlaylistFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    console.log(data);
    mutation.mutate(formData);
    return;
  }

  return {
    // allPlaylistsQuery,
    errors,
    isSubmitting,
    isLoading: mutation.isPending,
    register,
    handleSubmit,
    onSubmit,
    watch,
    setValue,
    setError,
  }
}