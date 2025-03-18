import { Sections } from "src/interfaces/section-interface";
import { AuthService } from "../AuthService"

export const isFavoritePlaylist = async ( playlistId: number ) => {
  const { data } = await AuthService.get<boolean>(`/favorites/playlist/${playlistId}`);
  return data; 
}

export const isFavoriteAlbum = async ( albumId: number ) => {
  const { data } = await AuthService.get<boolean>(`/favorites/album/${albumId}`);
  return data; 
}

export const getAllFavorites = async (): Promise<Sections[]> => {
  const { data } = await AuthService.get<Sections[]>(`favorites`);
  return data;
}