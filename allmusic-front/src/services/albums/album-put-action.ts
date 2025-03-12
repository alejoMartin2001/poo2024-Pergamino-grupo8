import { AllAlbumDto } from "src/interfaces/album-interface";
import { AuthService } from "../AuthService";

const albumPutAction = async():Promise<AllAlbumDto[]> => {
  const { data } = await AuthService.put(`/albums/{albumId}`)
    return data;
}