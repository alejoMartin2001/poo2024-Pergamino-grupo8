import { useParams } from 'react-router';
import { useAlbumById } from 'src/hooks/albums/useAlbum';

import { TableView, ViewBanner } from '@shared/view';
import { AlbumAddSongs } from './view/AlbumAddSongs';

export const AlbumView = () => {

  const { albumId } = useParams();
  const { albumData } = useAlbumById(Number(albumId) ?? 1)

  return (
    <div className="flex flex-col">
      <ViewBanner 
        title={albumData?.albumTitle ?? "Prueba"} 
        image={albumData?.imageUrl ?? ""}
        ownerName={albumData?.artistName ?? "Desconocido"}
        type={albumData?.type ?? "Desconocido"} 
      />
      <AlbumAddSongs 
        images={albumData?.imageUrl ?? ""} 
        username={albumData?.artistUsername ?? ""}
        albumId={albumData?.albumId ?? 1}
        releaseDate={albumData?.releaseDate ?? new Date()}
        albumName={albumData?.albumTitle ?? ""}
      />
      <TableView isAlbum={true} songAlbum={albumData?.songs} />
    </div>
  )
}