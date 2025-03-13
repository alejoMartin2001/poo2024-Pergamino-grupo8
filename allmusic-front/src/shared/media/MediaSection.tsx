
import { MediaCard } from "./MediaCard";
import { Sections } from "src/interfaces/section-interface";

interface MediaSectionProps {
  data: Sections[];
  isLoading?: boolean;
  isAlbum?: boolean
}

export const MediaSection = ({ data, isLoading = false, isAlbum = false }: MediaSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {(isLoading ? Array(6).fill(null) : data).map((item, index) => (
        <MediaCard key={index} data={item} isAlbum={isAlbum}/>
      ))}
      {
        !isLoading && !data && <h1>No hay datos</h1>
      }
    </div>
  )
}