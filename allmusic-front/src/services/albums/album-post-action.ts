import { AllAlbumDto } from "src/interfaces/album-interface";
import { AuthService } from "../AuthService";

const albumPostAction = async():Promise<AllAlbumDto[]> => {
  const { data } = await AuthService.post(`/albums/{albumId}`)
  return data;
}