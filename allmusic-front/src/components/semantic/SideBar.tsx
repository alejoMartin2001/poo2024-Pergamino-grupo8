import { SideBarItem } from "@shared/sidebar";
import { Home, Library, ListMusic } from "lucide-react";
import { useState } from "react";

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SideBar = ({ collapsed, setCollapsed }: Props) => {

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [animating, setAnimating] = useState(true);

  const toggleSidebar = () => {
    setAnimating(true);
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen fixed top-0 left-0 bg-gray-900 text-white p-3 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}
      relative`}
      onTransitionEnd={() => setAnimating(false)}
    >
      <button
        className="flex gap-3 p-2 mb-3 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-[#db2777] transition cursor-pointer"
        onClick={toggleSidebar}

      >
        <Library size={24} />
        {!collapsed && !animating && (
          <p className="font-medium">Tu Biblioteca</p>)}
      </button>
      
      <hr className="mb-3 border-t border-gray-700 " />
            
      <nav className="flex flex-col gap-3">
        <SideBarItem
          icon={Home}
          label="Inicio"
          collapsed={collapsed}
          animating={animating}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
        <SideBarItem
          icon={ListMusic}
          label="Playlists"
          collapsed={collapsed}
          animating={animating}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      </nav>

      <hr className="my-3 border-t border-gray-700 " />


    </div>
  )
}