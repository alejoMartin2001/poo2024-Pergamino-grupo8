import { AllAlbumDto } from "src/interfaces/album-interface";
import { AuthService } from "../AuthService"



export const albumGetAction = async (): Promise<AllAlbumDto[]> => {
  const { data } = await AuthService.get(`/albums/me`)
  return data;
}

export const albumGetAllAction = async (): Promise<AllAlbumDto[]> => {
  const { data } = await AuthService.get(`/albums`)
  return data;
}