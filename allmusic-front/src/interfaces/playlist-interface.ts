
export interface PlaylistResponseDto {
  playlistId: number;
  title: string;
  owner: string;
  username: string;
  description: string;
  imageUrl: string;
  type: string;
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