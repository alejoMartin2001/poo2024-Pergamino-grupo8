import { ViewBanner, ViewOptions } from "@shared/view";
import { useParams } from "react-router"
import { usePlaylist } from "src/hooks/usePlaylist";



export const PlaylistView = () => {

  const { playlistId } = useParams();

  const { dataPlaylist, handleChangePrivate } = usePlaylist( Number(playlistId) ?? 1 );
  console.log(dataPlaylist)

  return (
    <div className="flex flex-col">
      <ViewBanner 
        title={dataPlaylist?.title ?? "Prueba"} 
        image={dataPlaylist?.imageUrl ?? ""}
        ownerName={dataPlaylist?.owner ?? "Desconocido"} 
        type={dataPlaylist?.type ?? "Desconocido"}
      />
      <ViewOptions 
        images={dataPlaylist?.imageUrl ?? ""}
        isAlbum={false}
        isPrivate={dataPlaylist?.isPrivate ?? false}
        handleChangePrivate={handleChangePrivate}
      />
    </div>
  )
}