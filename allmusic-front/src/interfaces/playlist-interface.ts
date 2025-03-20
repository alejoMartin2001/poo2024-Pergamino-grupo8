import { Songs } from "./song-interface";

export interface PlaylistResponseDto {
  playlistId: number;
  title: string;
  owner: string;
  username: string;
  description: string;
  imageUrl: string;
  type: string;
  isPrivate: boolean;
  songs: Songs[];
}

export interface PlaylistFormData {
  title: string;
  description: string;
  image: FileList;
}

export interface PlaylistUpdateForm {
  title: string;
  description: string;
  image: FileList | null;
}

export interface playlistsTable {
  playlistId: number;
  playlistName: string;
}

export interface PlaylistSong {
  playlistId: number;
  songId: number;
}