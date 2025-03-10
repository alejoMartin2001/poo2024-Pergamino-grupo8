import { SideBar } from "@components/semantic";
import { Head } from "@components/semantic/Head";
import { useState } from "react"
import { Outlet, useLocation } from "react-router";
import { Explore } from "./Explore";


export const Home = () => {
  const isAccountPage = useLocation().pathname === "/";
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div className="flex ">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className={`flex-1 overflow-y-auto flex-col transition-all duration-300 bg-gradient-to-b from-gray-800 to-black`}>
        <Head />
        {isAccountPage && <Explore />}
        <Outlet />
      </main>
    </div>
  )
}