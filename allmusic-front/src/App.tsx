
interface Props {
  nombre: string;
  apellido?: string;
}

export const App = ({ }: Props) => {
  return (

    <>
      <div className="flex flex-1 justify-center items-center bg-[#1A1B25]">
        <div className="h-[40px] w-[40px] p-20 m-2 bg-amber-300 flex justify-center items-center">Color 1</div>
        <div className="h-[40px] w-[40px] p-20 m-2 bg-amber-600 flex justify-center items-center ">Color 2</div>
      </div>
    </>
  )
}