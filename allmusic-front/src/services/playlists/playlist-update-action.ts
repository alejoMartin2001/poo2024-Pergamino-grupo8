
import { AuthService } from '../AuthService';

export const playlistIsPrivate = async (numberId: number): Promise<boolean> => {
  const { data } = await AuthService.patch<boolean>(`playlists/private/${numberId}`);
  return data;
};
