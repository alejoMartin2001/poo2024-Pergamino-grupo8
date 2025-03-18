import { FavoriteDto } from "src/interfaces/favorite-interface";
import { AuthService } from "../AuthService";

export const favoriteRemove = async (favorite: FavoriteDto) => {
  const { data } = await AuthService.delete(`favorites`, { data: favorite });
  return data;
}