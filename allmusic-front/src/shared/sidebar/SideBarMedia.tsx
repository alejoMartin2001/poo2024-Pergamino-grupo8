
import { Link } from "react-router"

interface Props {
  name: string;
  image: string;
  type: string;
  author: string;

  navigate?: string;

  collapsed: boolean;
  animating: boolean;
  hoveredItem: string | null;
  setHoveredItem: (label: string | null) => void;
}

export const SideBarMedia = ({ name, image, type = "playlist", author, collapsed, hoveredItem, setHoveredItem, animating, navigate = "" }: Props) => {
  return (
    <Link to={navigate} className={`flex items-center gap-4 ${!collapsed && "px-2 py-1"} rounded-md hover:bg-gray-800 cursor-pointer`}
      onMouseEnter={() => setHoveredItem(name)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <img src={image} alt="" className="size-10 object-cover"/>
      {!collapsed && !animating ? (
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-400 font-medium">{`${type} - ${author}`}</p>
        </div>
      ) : collapsed && hoveredItem === name ? (
        <div className=" flex flex-col
          absolute px-2 py-1 font-medium text-white bg-gray-800 rounded-md left-18 z-40 whitespace-nowrap"
        >
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-400 font-medium">{`${type} - ${author}`}</p>
        </div>
      ) : null}
    </Link>
  )
}