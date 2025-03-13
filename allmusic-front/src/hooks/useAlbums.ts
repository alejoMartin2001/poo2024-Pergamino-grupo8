import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useAlert } from "src/contexts/AlertProvider";
import { AlbumCreate } from "src/interfaces/album-interface";
import { albumGetAction, albumGetAllAction } from "src/services/albums/album-get-action";
import { albumCreateSingle, albumCreateEp, albumCreateLp } from "src/services/albums/album-post-action"; // Ajusta el import


const albumMutation = {
  single: albumCreateSingle,
  extended: albumCreateEp,
  long: albumCreateLp,
};

export const useAlbum = (setIsModalOpen?: (isModalOpen: boolean) => void, albumType?: string) => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<AlbumCreate>();

  const { showAlert } = useAlert();

  const allAlbums = useQuery({
    queryKey: ["allAlbums"],
    queryFn: albumGetAllAction,
    staleTime: 1000 * 60 * 60,
  })

  const allAlbumsQuery = useQuery({
    queryKey: ["allAlbumsMe"],
    queryFn: albumGetAction,
    staleTime: 1000 * 60 * 60,
  });

  const mutation = useMutation({
    mutationFn: albumType === "single" ? albumMutation.single : ( albumType === 'ep' ? albumMutation.extended : albumMutation.long),
    onSuccess: () => {
      setIsModalOpen && setIsModalOpen(false);
      showAlert("Álbum creado", "Ahora puedes a", "success");
      allAlbumsQuery.refetch();
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });

  const onSubmit = (data: AlbumCreate) => {
    const formData = new FormData();
    formData.append("albumName", data.title);
    formData.append("releaseDate", data.releaseDate);
    if (data.image && data.image.length > 0) {
      formData.append("imageUrl", data.image[0]);
    }
    console.log(data)

    mutation.mutate(formData);
  };


  return {
    allAlbums: allAlbums.data,
    allAlbumsData: allAlbumsQuery.data,
    isLoadingAlbumsMe: allAlbumsQuery.isLoading,
    isLoadingCreation: mutation.isPending,
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
