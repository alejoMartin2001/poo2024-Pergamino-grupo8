import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  animating: boolean;
  hoveredItem: string | null;
  setHoveredItem: (label: string | null) => void;
}

export const SideBarItem = ({ icon: Icon, label, collapsed, hoveredItem, setHoveredItem, animating }: Props) => {
  return (
    <div className={`flex items-center gap-4 p-2 rounded-md hover:bg-gray-800 cursor-pointer`}
      onMouseEnter={() => setHoveredItem(label)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <Icon size={24} />
      {!collapsed && !animating ? (
        <span className="font-medium">{label}</span>
      ) : collapsed && hoveredItem === label ? (
        <span className="absolute px-2 py-1 text-xs text-white bg-gray-800 rounded-md left-18">{label}</span>
      ) : null}
    </div>
  )
}