import { MediaCard } from "./MediaCard";

// Prueba
interface MediaData {
  image: string;
  title: string;
  subtitle: string;
}

interface MediaSectionProps {
  data: MediaData[];
  isLoading?: boolean;
}

export const MediaSection = ({ data, isLoading = false }: MediaSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {(isLoading ? Array(6).fill(null) : data).map((item, index) => (
        <MediaCard key={index} data={item} />
      ))}
    </div>
  )
}