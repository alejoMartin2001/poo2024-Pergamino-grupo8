// import { MediaContainer } from "@shared/media/MediaContainer";
// import { MediaSection } from "@shared/media/MediaSection";

import { useEffect } from "react";
import { useAlbum } from "src/hooks/useAlbum";

export const Album = () => {

  const { allAlbumsQuery } = useAlbum();

  useEffect(() => {
    console.log(allAlbumsQuery.data)
  }, [])

  return (
    <div className="flex flex-col text-white">
      {/* Prueba. Después BORRAR */}
      {
        allAlbumsQuery.isFetching ? <h1>Cargando...</h1>
        : <p>{JSON.stringify(allAlbumsQuery.data, null, 2)}</p>
      }
    </div>
  );
};