import { PlaylistResponseDto } from "src/interfaces/playlist-interface";
import { AuthService } from "../AuthService";


export const playlistGetAction = async():Promise<PlaylistResponseDto[]> => {
  const { data } = await AuthService.get("/me/playlist");
  return data;
}