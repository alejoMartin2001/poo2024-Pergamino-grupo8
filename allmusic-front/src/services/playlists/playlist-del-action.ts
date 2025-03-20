import { PlaylistSong } from "src/interfaces/playlist-interface";
import { AuthService } from "../AuthService";

export const playlistDelSongAction = async (songToPlaylist: PlaylistSong) => {
  const { data } = await AuthService.delete(`/playlists/song`, { data: songToPlaylist });
  return data;
}