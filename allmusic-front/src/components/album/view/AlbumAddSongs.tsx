
import { AlbumOptions } from "./AlbumOptions"

interface Props {
  albumId: number;
  albumName: string;
  releaseDate: Date;
  images: string;
  username: string;
}

export const AlbumAddSongs = ({ images, username, albumId, releaseDate, albumName }: Props) => {
  return (
    <div className='flex items-center justify-between px-10 py-5'>
      <AlbumOptions images={images} username={username} albumId={albumId} releaseDate={releaseDate} albumName={albumName}/>
    </div>
  )
}