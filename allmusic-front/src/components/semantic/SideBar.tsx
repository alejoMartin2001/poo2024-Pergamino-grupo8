
import { Compass, Disc, Library, ListMusic, Settings } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from 'src/contexts/AuthProvider';

import { SideBarItem } from '@shared/sidebar';
import { SideBarMedia } from '@shared/sidebar/SideBarMedia';
import { useFavorites } from 'src/hooks/useFavorites';

interface Props {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}


export const SideBar = ({ collapsed, setCollapsed }: Props) => {

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [animating, setAnimating] = useState(true);
  const { isArtist } = useAuth();
  const { allFavorites } = useFavorites();

  const toggleSidebar = () => {
    setAnimating(true);
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`h-screen sticky top-0 left-0 bg-gray-900 text-white p-3 transition-all duration-300 
        ${collapsed ? "w-16" : "w-64"} flex flex-col justify-between relative z-50`}
      onTransitionEnd={() => setAnimating(false)}
    >
      <div>
        <button
          className={`flex gap-3 p-2 mb-3 bg-gray-800 rounded-md 
            hover:bg-gray-700
            text-${isArtist ? "blue-500" : "[#db2777]"} 
            transition cursor-pointer
          `}
          onClick={toggleSidebar}
        >
          <Library size={24} />
          {!collapsed && !animating && <p className="font-medium">Tu Biblioteca</p>}
        </button>

        <hr className="mb-3 border-t border-gray-700" />

        <nav className="flex flex-col gap-3">
          <SideBarItem
            icon={Compass}
            label="Explorar"
            collapsed={collapsed}
            animating={animating}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
          <SideBarItem
            icon={ListMusic}
            label="Playlists"
            navigate="playlists"
            collapsed={collapsed}
            animating={animating}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />

          {isArtist &&
            <SideBarItem
              icon={Disc}
              label="Álbumes"
              navigate="albums"
              collapsed={collapsed}
              animating={animating}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
            />}
        </nav>

        <hr className="my-3 border-t border-gray-700" />

        {/* Prueba */}
      </div>
      <div className="flex flex-col gap-3 h-full overflow-y-auto no-scrollbar">
        {allFavorites?.map((fav, key) => (
          <SideBarMedia
            key={key}
            name={fav.sectionName}
            image={fav.imageUrl}
            type={fav.type}
            navigate={fav.type === 'Playlist' ? `/playlist/${fav.sectionId}` : `/album/${fav.sectionId}`}
            author={fav.ownerName}
            collapsed={collapsed}
            animating={animating}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
          />
        ))}
      </div>


      <div>
        <hr className="my-3 border-t border-gray-700" />

        <SideBarItem
          icon={Settings}
          label="Configuración"
          navigate="settings"
          collapsed={collapsed}
          animating={animating}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      </div>
    </aside>
  )
}