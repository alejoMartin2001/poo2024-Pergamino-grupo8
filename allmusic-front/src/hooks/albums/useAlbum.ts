import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form";
import { useAlert } from "src/contexts/AlertProvider";
import { AlbumUpdate, SongAlbum } from "src/interfaces/album-interface";
import { albumById, albumsAddSongs, albumsByArtist } from "src/services/albums/album-post-action";
import { albumUpdateAction } from "src/services/albums/album-put-action";

const time = 1000 * 60 * 60; // 1 Hora.

export const useAlbumUpdate = (
  albumId: number, 
  albumName: string, 
  releaseDate: Date, 
  setIsModalOpen?: (isModalOpen: boolean) => void
) => {

  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors }
  } = useForm<AlbumUpdate>({
    defaultValues: {
      albumName,
      releaseDate,
      image: null
    }
  });

  const updateAlbum = useMutation({
    mutationFn: ({ albumId, update }: { albumId: number; update: FormData }) =>
      albumUpdateAction(albumId, update),
    onSuccess: () => {
      setIsModalOpen && setIsModalOpen(false);
      showAlert("Se actualizó el álbum", "", "success");
      queryClient.invalidateQueries({ queryKey: ["album"] }); 
      queryClient.invalidateQueries({ queryKey: ["AllFavotires"] });
    }
  });

  const onSubmit = (data: AlbumUpdate) => {
    const formData = new FormData();
    formData.append("albumName", data.albumName);
    formData.append("releaseDate", String(data.releaseDate));
    if (data.image && data.image.length > 0){
      formData.append("imageUrl", data.image[0])
    }
    updateAlbum.mutate({albumId, update: formData});
  }

  return {
    errors,
    isLoading: updateAlbum.isPending,

    register,
    handleSubmit,
    onSubmit,
    reset,
    watch,
    setValue,
    setError,
  }
}


export const useAlbumAddSong = (albumId: number) => {

  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const addSongsAlbum = useMutation({
    mutationFn: ({albumId, songs}: {albumId: number; songs: SongAlbum[]}) => 
      albumsAddSongs(albumId, songs),
    onSuccess: () => {
      showAlert("¡Canciones agregadas exitosamente al álbum!", "", "success");
      queryClient.invalidateQueries({ queryKey: ["album"] }); 
    }
  });

  const onSubmit = (data: SongAlbum[]) => {
    addSongsAlbum.mutate({albumId, songs: data})
  }

  return {
    onSubmit,
  }
}


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
