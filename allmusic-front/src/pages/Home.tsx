import { SideBar } from "@components/semantic";
import { Header } from "@shared/header/Header";
import { useState } from "react"


export const Home = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div className="flex ">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <div className={`flex-1 flex flex-col transition-all duration-300`}>
        <Header />
        <div className="bg-emerald-400">
          Color
        </div>
        <div className="bg-amber-300">
          Amarillo
        </div>
      </div>
    </div>
  )
}