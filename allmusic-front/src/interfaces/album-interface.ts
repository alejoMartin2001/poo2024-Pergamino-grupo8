export interface AllAlbumDto {
  albumId:     number;
  albumName:   string;
  imageUrl:    string;
  artistName:  string;
  releaseDate: Date;
  songs:       Song[];
}

export interface Song {
  title:    string;
  duration: number;
  genre:    string;
}
