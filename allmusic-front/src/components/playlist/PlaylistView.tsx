import { TableView, ViewBanner, ViewOptions } from "@shared/view";
import { useParams } from "react-router"
import { usePlaylist } from "src/hooks/playlists/usePlaylist";


export const PlaylistView = () => {

  const { playlistId } = useParams();

  const { dataPlaylist, handleChangePrivate } = usePlaylist(Number(playlistId) ?? 1);

  return (
    <div className="flex flex-col">
      <ViewBanner
        title={dataPlaylist?.title ?? "Prueba"}
        image={dataPlaylist?.imageUrl ?? ""}
        ownerName={dataPlaylist?.owner ?? "Desconocido"}
        type={dataPlaylist?.type ?? "Desconocido"}
      />
      <ViewOptions
        playlistId={dataPlaylist?.playlistId ?? 1}
        images={dataPlaylist?.imageUrl ?? ""}
        isAlbum={false}
        isPrivate={dataPlaylist?.isPrivate ?? false}
        handleChangePrivate={handleChangePrivate}
      />
      {dataPlaylist?.songs ?
      <div className="w-full px-10">
        <h1 
          className="font-medium w-full  text-gray-300 border-2 border-gray-700 bg-gray-900 p-2 rounded-xl italic"
        >No hay canciones
        </h1>
      </div> :
        <TableView isAlbum={true} songAlbum={dataPlaylist?.songs} />}
    </div>
  )
}