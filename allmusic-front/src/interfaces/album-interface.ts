// export interface AllAlbumDto {
//   albumId:     number;
//   albumName:   string;
//   imageUrl:    string;
//   artistName:  string;
//   releaseDate: Date;
//   songs:       Song[];
// }

export interface AlbumCreate {
  title: string;
  releaseDate: string;
  image: FileList;
  albumType: string;
}

export interface AlbumResponseDto {
  albumId: number;
  albumTitle: string;
  imageUrl: string;
  artistName: string;
  artistUsername: string;
  type: string;
  releaseDate: Date;
  songs: SongAlbum[];
}

export interface SongAlbum {
  title:    string;
  duration: number;
  genre:    string;
}