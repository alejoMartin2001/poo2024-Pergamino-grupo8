import { AllAlbumDto } from "src/interfaces/album-interface";
import { AuthService } from "../AuthService";

const albumDeleteAction = async():Promise<AllAlbumDto[]> => {
  const { data } = await AuthService.delete(`/albums/{albumId}`)
  return data;
}