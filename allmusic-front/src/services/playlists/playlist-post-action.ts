
import { PlaylistResponseDto } from "src/interfaces/playlist-interface";
import { AuthService } from "../AuthService";

export const playlistCreateAction = async (playlist: FormData) => {
  const { data } = await AuthService.post("/playlists", playlist);
  return data;
}

export const playlistIdGetAction = async (numberId: number): Promise<PlaylistResponseDto> => {
  const { data } = await AuthService.post(`playlists/${numberId}`);
  return data;
}
