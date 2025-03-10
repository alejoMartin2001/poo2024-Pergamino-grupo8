import { LucideIcon } from "lucide-react";
import { Link } from "react-router";

interface Props {
  icon: LucideIcon;
  label: string;
  navigate?: string;

  collapsed: boolean;
  animating: boolean;
  hoveredItem: string | null;
  setHoveredItem: (label: string | null) => void;
}

export const SideBarItem = ({ icon: Icon, label, collapsed, hoveredItem, setHoveredItem, animating, navigate = "" }: Props) => {
  return (
    <Link to={`/${navigate}`} className={`flex items-center gap-4 p-2 rounded-md hover:bg-gray-800 cursor-pointer`}
      onMouseEnter={() => setHoveredItem(label)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <Icon size={24} />
      {!collapsed && !animating ? (
        <span className="font-medium">{label}</span>
      ) : collapsed && hoveredItem === label ? (
        <span className="
          absolute px-2 py-1 text-base font-medium text-white bg-gray-800 rounded-md left-18 z-40"
        >{label}</span>
      ) : null}
    </Link>
  )
}