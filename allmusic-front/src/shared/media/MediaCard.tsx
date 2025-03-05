
interface Props {

}

export const MediaCard = ({}: Props) => {
  return (
    <div className="w-48 p-2 animate-pulse">
      <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
      <div className="w-3/4 h-4 mt-2 bg-gray-600 rounded"></div>
      <div className="w-1/2 h-4 mt-2 bg-gray-600 rounded"></div>
    </div>
  )
}