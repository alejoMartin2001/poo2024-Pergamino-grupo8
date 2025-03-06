
// Prueba
interface MediaData {
  image: string;
  title: string;
  subtitle: string;
}

interface MediaCardProps {
  data?: MediaData;
}

export const MediaCard = ({ data }: MediaCardProps) => {
  return (
    <div className={`w-48 p-2 ${data ?? "animate-pulse"}`}>
      {data ? (
        <>
          <img src={data.image} alt={data.title} className="w-full h-48 rounded-lg object-cover" />
          <div className="mt-2 text-sm font-semibold">{data.title}</div>
          <div className="mt-1 text-xs text-gray-500">{data.subtitle}</div>
        </>
      ) : (
        <>
          <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
          <div className="mt-2 h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="mt-1 h-4 bg-gray-600 rounded w-1/2"></div>
        </>
      )}
    </div>
  )
}