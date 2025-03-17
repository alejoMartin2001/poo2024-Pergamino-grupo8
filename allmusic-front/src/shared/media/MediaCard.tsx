import { Dot } from "lucide-react";
import { Link } from "react-router";
import { Sections } from "src/interfaces/section-interface";



interface MediaCardProps {
  data?: Sections;
  isAlbum: boolean;
}

export const MediaCard = ({ data, isAlbum }: MediaCardProps) => {

  return (
    <Link className={`w-48 p-3 ${data ? "hover:bg-gray-800 rounded-lg transition duration-200 cursor-pointer" : "animate-pulse"}`}
      to={`/${isAlbum ? "album" : "playlist"}/${data?.sectionId}`}>
      {data ? (
        <>
          <img src={data.imageUrl} className="w-full h-48 rounded-lg object-cover" />
          <div className="mt-1 text-base font-semibold">{data.sectionName}</div>
          <div className="mt-1 text-sm font-medium text-gray-500 flex items-center">
            <p className="font-medium">{data.type}</p>
            <Dot />
            {isAlbum ?
              <Link
                to={`/profileArtist/${data.ownerUsername}`}
                className="capitalize hover:underline hover:text-gray-400 truncate max-w-[120px] overflow-hidden whitespace-nowrap"
                title={data.ownerName}
              >
                {data.ownerName}
              </Link> :
              <p
                className="capitalize hover:underline hover:text-gray-400 truncate max-w-[120px] overflow-hidden whitespace-nowrap"
                title={data.ownerName}
              >
                {data.ownerName}
              </p>}
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
          <div className="mt-2 h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="mt-1 h-4 bg-gray-600 rounded w-1/2"></div>
        </>
      )}
    </Link>
  )
}