import { Search } from 'lucide-react'

interface Props {

}

export const SearchHead = ({}: Props) => {
  return (
    <div className="relative flex-1 text-white">
      <Search
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
      />
      <input
        type="text"
        placeholder="Buscar canciones, artistas..."
        className="w-full bg-gray-700/50 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db2777]"
      />
    </div>
  )
}