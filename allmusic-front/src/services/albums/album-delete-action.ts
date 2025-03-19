import { AuthService } from "../AuthService";
import { AlbumResponseDto } from "src/interfaces/album-interface";

export const albumDeleteAction = async (albumId: number): Promise<AlbumResponseDto> => {
  const { data } = await AuthService.delete(`/albums/${albumId}`);
  return data;
};
