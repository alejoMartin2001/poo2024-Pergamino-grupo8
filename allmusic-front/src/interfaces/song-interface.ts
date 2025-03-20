
export interface Songs {
  // ¡Sólo si es playlist!
  songId: number;
  imageAlbum?: string;
  albumName?: string; 
  artist?: string[];
  albumId?: number;
  
  title: string;
  duration: number;
  genre: string;

}