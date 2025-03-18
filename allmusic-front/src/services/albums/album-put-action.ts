
import { AuthService } from "../AuthService";

export const albumUpdateAction = async (albumId: number, update: FormData) => {
  const { data } = await AuthService.put(`/albums/${albumId}`, update)
  return data;
}