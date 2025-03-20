import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useAlert } from "src/contexts/AlertProvider";
import { AlbumCreate } from "src/interfaces/album-interface";
import { albumGetAction, albumGetAllAction } from "src/services/albums/album-get-action";
import { albumCreateSingle, albumCreateEp, albumCreateLp } from "src/services/albums/album-post-action"; // Ajusta el import
import { albumDeleteAction } from "src/services/albums/album-delete-action";

const albumMutation = {
  single: albumCreateSingle,
  extended: albumCreateEp,
  long: albumCreateLp,
};


export const useAlbums = (setIsModalOpen?: (isModalOpen: boolean) => void, albumType?: string) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<AlbumCreate>();

  const { showAlert, } = useAlert();

  // Queries
  const allAlbumsQuery = useQuery({
    queryKey: ["allAlbums"],
    queryFn: albumGetAllAction,
    staleTime: 1000 * 60 * 60,
  })

  const allAlbumsMeQuery = useQuery({
    queryKey: ["allAlbumsMe"],
    queryFn: albumGetAction,
    staleTime: 1000 * 60 * 60,
  });

  // Mutaties.
  const albumCreate = useMutation({
    mutationFn: albumType === "single" ? albumMutation.single : ( albumType === 'ep' ? albumMutation.extended : albumMutation.long),
    onSuccess: () => {
      setIsModalOpen && setIsModalOpen(false);
      showAlert("Álbum creado", "¡Ahora puedes agregar canciones a tu álbum!", "success");
      allAlbumsMeQuery.refetch();
      allAlbumsQuery.refetch();
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });


  // Mutación para eliminar álbum
  const albumDelete = useMutation({
    mutationFn: (albumId:number) => albumDeleteAction(albumId),
    onSuccess: () => {
      showAlert("Álbum eliminado", "El álbum se eliminó correctamente.", "success");
      allAlbumsMeQuery.refetch();
      allAlbumsQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["AllFavotires"] });
    },
    onError: (error: AxiosError) => {
      showAlert("Error", "No se pudo eliminar el álbum.", "error");
      console.error(error);
    }
  });

  const onDeleteAlbum = (albumId: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este álbum?");
  
    if (confirmDelete) {
      showAlert("Álbum eliminado", "El álbum ha sido eliminado correctamente.", "warning", 5000);
      albumDelete.mutate(albumId); // Llamas a la mutación para eliminar el álbum
    }
  };


  // Funciones.
  const onSubmit = (data: AlbumCreate) => {
    const formData = new FormData();
    formData.append("albumName", data.title);
    formData.append("releaseDate", data.releaseDate);
    if (data.image && data.image.length > 0) {
      formData.append("imageUrl", data.image[0]);
    }
    
    albumCreate.mutate(formData);
  };


  return {
    // Datos.
    allAlbums: allAlbumsQuery.data,
    albumsMeData: allAlbumsMeQuery.data,
    
    onDeleteAlbum,

    // Loaders.
    isLoadingAlbumsMe: allAlbumsMeQuery.isLoading,
    isLoadingCreation: albumCreate.isPending,
    isLoadingAll: allAlbumsQuery.isLoading,
    
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
