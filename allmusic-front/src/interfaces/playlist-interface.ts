
export interface PlaylistResponseDto {
  playlistId: number;
  title: string;
  owner: String;
  username: string;
  description: string;
  imageUrl: string;
  isPrivate: boolean;
  songs: Song[];
}

export interface PlaylistFormData {
  title: string;
  description: string;
  image: FileList;
}

export interface Song {
  title: string;
  duration: number;
  genre: string;
}