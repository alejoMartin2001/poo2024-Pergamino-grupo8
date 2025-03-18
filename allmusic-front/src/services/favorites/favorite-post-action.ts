import { FavoriteDto } from "src/interfaces/favorite-interface";
import { AuthService } from "../AuthService";

export const favoriteCreate = async (favorite: FavoriteDto) => {
  const { data } = await AuthService.post(`favorites`, favorite);
  return data;
}