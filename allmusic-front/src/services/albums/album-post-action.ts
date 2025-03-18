import { AlbumResponseDto, SongAlbum } from "src/interfaces/album-interface";
import { AuthService } from "../AuthService";
import { Sections } from "src/interfaces/section-interface";


export const albumCreateSingle = async (single: FormData) => {
  const { data } = await AuthService.post(`/albums/single`, single);
  return data;
}

export const albumCreateEp = async (extended: FormData) => {
  const { data } = await AuthService.post(`/albums/extended`, extended);
  return data;
}

export const albumCreateLp = async (long: FormData) => {
  const { data } = await AuthService.post(`/albums/long`, long);
  return data;
}

export const albumById = async (albumId: number): Promise<AlbumResponseDto> => {
  const { data } = await AuthService.post(`album/${albumId}`);
  return data;
}

export const albumsByArtist = async (artistUsername: string): Promise<Sections[]> => {
  const { data } = await AuthService.post(`albums/artist/${artistUsername}`);
  return data;
}

export const albumsAddSongs = async (albumId: number, songs: SongAlbum[]) => {
  const {data} = await AuthService.post(`albums/${albumId}`, songs);
  return data;
}