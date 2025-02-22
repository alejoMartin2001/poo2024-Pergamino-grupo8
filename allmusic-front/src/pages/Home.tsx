import { SideBar } from "@components/semantic/SideBar"
import { Header } from "@shared/header/Header"

type Props = {}

export const Home = ({}: Props) => {
  return (
    <div className="flex gap-2">
      <div>
        <SideBar />
      </div>

      <div className="">
        <Header />
      </div>
    </div>
  )
}