import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAlert } from "src/contexts/AlertProvider";
import { FavoriteDto } from "src/interfaces/favorite-interface"
import { favoriteRemove } from "src/services/favorites/favorite-del-action";
import { getAllFavorites, isFavoriteAlbum, isFavoritePlaylist } from "src/services/favorites/favorite-get-action";
import { favoriteCreate } from "src/services/favorites/favorite-post-action";


export const useFavorites = (playlistId?: number, albumId?: number) => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  // Consultar si una playlist es favorita
  const {
    data: isPlaylistFavorite,
    isError: isErrorPlaylist,
  } = useQuery({
    queryKey: ["favoritePlaylist", playlistId],
    queryFn: () => (playlistId ? isFavoritePlaylist(playlistId) : Promise.resolve(false)), 
    enabled: !!playlistId, // Solo se ejecuta si existe playlistId
  });

  // Consultar si un álbum es favorito
  const {
    data: isAlbumFavorite,
    isError: isErrorAlbum,
  } = useQuery({
    queryKey: ["favoriteAlbum", albumId],
    queryFn: () => (albumId ? isFavoriteAlbum(albumId) : Promise.resolve(false)),
    enabled: !!albumId, // Solo se ejecuta si existe albumId
  });

  const {
    data: allFavorites,
    isLoading: isLoadingAllFavorites,
  } = useQuery({
    queryKey: ["AllFavotires"],
    queryFn: getAllFavorites,
  })

  // Crear favorito (Playlist o Álbum)
  const createFavorite = useMutation({
    mutationFn: favoriteCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritePlaylist"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteAlbum"] });
      queryClient.invalidateQueries({ queryKey: ["AllFavotires"] });
      showAlert("Se agregado a favoritos", "¡Ya puedes verlo en el menú principal!", "success");
    },
  });

  // Eliminar favorito
  const removeFavorite = useMutation({
    mutationFn: favoriteRemove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritePlaylist"] });
      queryClient.invalidateQueries({ queryKey: ["favoriteAlbum"] });
      queryClient.invalidateQueries({ queryKey: ["AllFavotires"] });
      showAlert("Se eliminó de favoritos", "", "success");
    },
  });

  // Función para agregar a favoritos
  const onSubmitCreate = (data: FavoriteDto) => {
    createFavorite.mutate(data);
  };

  // Función para eliminar de favoritos
  const onSubmitRemove = (data: FavoriteDto) => {
    removeFavorite.mutate(data);
  };

  return {
    allFavorites,
    isLoadingAllFavorites,
    isPlaylistFavorite,
    isLoadingPlaylist: createFavorite.isPending || removeFavorite.isPending,
    isErrorPlaylist,
    isAlbumFavorite,
    isLoadingAlbum : createFavorite.isPending || removeFavorite.isPending,
    isErrorAlbum,
    onSubmitCreate,
    onSubmitRemove,
  };
};