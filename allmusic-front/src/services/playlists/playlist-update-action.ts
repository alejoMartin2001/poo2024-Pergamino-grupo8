
import { AuthService } from '../AuthService';

export const playlistIsPrivate = async (numberId: number): Promise<boolean> => {
  const { data } = await AuthService.patch<boolean>(`playlists/private/${numberId}`);
  return data;
};

export const playlistUpdateAction = async (playlistId: number, update: FormData) => {
  const { data } = await AuthService.put(`/playlists/${playlistId}`, update);
  return data;
}