import { AuthService } from "../AuthService";
import { PlaylistResponseDto } from "src/interfaces/playlist-interface";

export const playlistDeleteAction = async (playlistId: number): Promise<PlaylistResponseDto> => {
  const { data } = await AuthService.delete(`/playlists/${playlistId}`);
  return data;
};