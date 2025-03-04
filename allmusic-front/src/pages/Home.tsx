import { SideBar } from "@components/semantic";
import { Head } from "@components/semantic/Head";
import { useState } from "react"
import { useAuth } from "src/contexts/AuthProvider";


export const Home = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const {isAuth} = useAuth();

  console.log(isAuth);
  return (
    <div className="flex ">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>

      <main className={`flex-1 overflow-y-auto flex-col transition-all duration-300 bg-gradient-to-b from-gray-800 to-black`}>
        <Head />
      </main>
    </div>
  )
}