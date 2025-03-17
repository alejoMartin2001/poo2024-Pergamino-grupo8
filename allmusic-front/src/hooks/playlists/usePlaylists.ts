import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useAlert } from "src/contexts/AlertProvider";
import { PlaylistFormData } from "src/interfaces/playlist-interface";
import { getPlaylistsMeAction } from "src/services/playlists/playlist-get-action";
import { playlistCreateAction } from "src/services/playlists/playlist-post-action";


export const usePlaylists = ( setIsModalOpen?: (isModalOpen: boolean) => void ) => {

  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<PlaylistFormData>();

  // Queries.
  const allPlaylistsMeQuery = useQuery({
    queryKey: ["allPlaylistMe"],
    queryFn: getPlaylistsMeAction,
    staleTime: 1000 * 60 * 60,
  })

  
  // Mutates.
  const playlistCreate = useMutation({
    mutationFn: playlistCreateAction,
    onSuccess: () => {
      setIsModalOpen && setIsModalOpen(false);
      showAlert("Playlist Creada", "¡Ahora puedes añadirle las canciones que te gustan!", "success");
      allPlaylistsMeQuery.refetch();
    },
    onError: (error: AxiosError) => {
      console.log(error);
      showAlert("Error al crear una playlist", "Algo no salió bién", "error")
    }
  });

  // Funciones.
  const onSubmit = (data: PlaylistFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }
    console.log(data);
    playlistCreate.mutate(formData);
    return;
  }

  return {
    // Datos  
    allPlaylistsData: allPlaylistsMeQuery.data,

    // Loaders
    isLoadingAllPlaylist: allPlaylistsMeQuery.isLoading,
    isLoadingCreation: playlistCreate.isPending,

    errors,
    isSubmitting,
    
    register,
    handleSubmit,
    onSubmit,
    watch,
    setValue,
    setError,
  }
}