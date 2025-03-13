
import { AuthService } from "../AuthService";

export const playlistCreateAction = async (playlist: FormData) => {
  const { data } = await AuthService.post("/playlists", playlist);
  return data;
}