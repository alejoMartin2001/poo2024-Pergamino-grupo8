import { useParams } from "react-router";
import albumImage from "@images/album/20230607_190841.jpg"
import { ViewBanner } from "@shared/view";
import { ViewOptions } from "@shared/view/ViewOptions";
import { TableView } from "@shared/view/TableView";
import { usePlaylist } from "src/hooks/usePlaylist";
import { useAlbum } from "src/hooks/useAlbum";

const songs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    cover: albumImage,
  },
  {
    id: 2,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:35",
    cover: albumImage,
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    cover: albumImage,
  },
  {
    id: 4,
    title: "Peaches",
    artist: "Justin Bieber",
    album: "Justice",
    duration: "3:18",
    cover: albumImage,
  },
];

export const AlbumView = () => {

  const { albumId } = useParams();
  const { albumData } = useAlbum(Number(albumId) ?? 1)

  return (
    <div className="flex flex-col">
      <ViewBanner 
        title={albumData?.albumTitle ?? "Prueba"} 
        image={albumData?.imageUrl ?? ""}
        ownerName={albumData?.artistName ?? "Desconocido"}
        type={albumData?.type ?? "Desconocido"} 
      />
      {/* <ViewOptions images={albumImage} /> */}
      <TableView isAlbum={true} songAlbum={albumData?.songs}/>
    </div>
  )
}