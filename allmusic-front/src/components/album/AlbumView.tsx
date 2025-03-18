import { useParams } from 'react-router';
import { useAlbumById } from 'src/hooks/albums/useAlbum';

import { TableView, ViewBanner } from '@shared/view';
import { AlbumOptions } from './view/AlbumOptions';
import { useAuth } from 'src/contexts/AuthProvider';
import { AlbumTable } from './view/AlbumTable';
import { useEffect, useState } from 'react';

export const AlbumView = () => {

  const { albumId } = useParams();
  const { albumData } = useAlbumById(Number(albumId) ?? 1);

  // Abre el modal para agregar canciones.
  const [isAddSongsOpen, setIsAddSongsOpen] = useState<boolean>(false);

  // Lógica para saber el propietario del álbum.
  const [hasSongs, setHasSongs] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);


  const { user } = useAuth();

  useEffect(() => {
    const isOwner = user?.username === albumData?.artistUsername;
    const hasSongs = (albumData?.songs?.length ?? 0) > 0;
    setHasSongs(hasSongs);
    setIsOwner(isOwner);
  }, [albumData])

  console.log(albumData)
  return (
    <div className="flex flex-col">
      <ViewBanner
        title={albumData?.albumTitle ?? "Prueba"}
        image={albumData?.imageUrl ?? ""}
        ownerName={albumData?.artistName ?? "Desconocido"}
        type={albumData?.type ?? "Desconocido"}
      />
      <AlbumOptions
        images={albumData?.imageUrl ?? ""}
        albumId={albumData?.albumId ?? 1}
        releaseDate={albumData?.releaseDate ?? new Date()}
        albumName={albumData?.albumTitle ?? ""}
        isSongs={hasSongs}
        isOwner={isOwner}
        setIsAddSongsOpen={setIsAddSongsOpen}
      />

      {isOwner
        ? (hasSongs ? <TableView isAlbum={true} songAlbum={albumData?.songs} />
          :
          <AlbumTable
            albumType={albumData?.type ?? 'LP'}
            albumId={albumData?.albumId ?? 1}
            isAddSongsOpen={isAddSongsOpen}
            setIsAddSongsOpen={setIsAddSongsOpen}
          />)
        : (hasSongs && <TableView isAlbum={true} songAlbum={albumData?.songs} />)
      }
    </div>
  )
}