import { TableView, ViewBanner, ViewOptions } from "@shared/view";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useAuth } from "src/contexts/AuthProvider";
import { usePlaylist } from "src/hooks/playlists/usePlaylist";
import { usePlaylists } from "src/hooks/playlists/usePlaylists";
import { playlistsTable } from "src/interfaces/playlist-interface";


export const PlaylistView = () => {

  const { playlistId } = useParams();
  const { dataPlaylist, handleChangePrivate, loadingPrivate } = usePlaylist(Number(playlistId) ?? 1);
  
  const { allPlaylistsData } = usePlaylists();

  const [hasSongs, setHasSongs] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const [playlists, setPlaylists] = useState<playlistsTable[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    setIsOwner( dataPlaylist?.username === user?.username);
    setHasSongs((dataPlaylist?.songs?.length ?? 0) > 0);
  }, [dataPlaylist]);

  useEffect(() => {
    const transformed = allPlaylistsData?.map(playlist => ({
      playlistId: playlist.sectionId,
      playlistName: playlist.sectionName
    }));
    setPlaylists(transformed ?? []);
  }, [allPlaylistsData]);

  return (
    <div className="flex flex-col">
      <ViewBanner
        title={dataPlaylist?.title ?? "Prueba"}
        image={dataPlaylist?.imageUrl ?? ""}
        ownerName={dataPlaylist?.owner ?? "Desconocido"}
        type={dataPlaylist?.type ?? "Desconocido"}
        isPlaylist={true}
        songs={dataPlaylist?.songs ?? []}
      />
      <ViewOptions
        title={dataPlaylist?.title ?? ""}
        description={dataPlaylist?.description ?? ""}
        playlistId={dataPlaylist?.playlistId ?? 1}
        images={dataPlaylist?.imageUrl ?? ""}
        isPrivate={dataPlaylist?.isPrivate ?? false}
        isOwner={isOwner}
        loadingPrivate={loadingPrivate}
        handleChangePrivate={handleChangePrivate}
      />
      {!hasSongs ?
      <div className="w-full px-10">
        <h1 
          className="font-medium w-full  text-gray-300 border-2 border-gray-700 bg-gray-900 p-2 rounded-xl italic"
        >No hay canciones
        </h1>
      </div> :
        <TableView 
          songs={dataPlaylist?.songs ?? []} 
          isPlaylist={true} 
          playlistName={playlists}
          playlistId={dataPlaylist?.playlistId ?? 1}
        />}
    </div>
  )
}