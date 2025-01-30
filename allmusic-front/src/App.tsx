
interface Props {
  nombre: string;
  apellido?: string;
}

export const App = ({ }: Props) => {
  return (

    <>
      <div className="flex justify-center items-center bg-[#1A1B25] h-screen w-screen">
      <div className="
          h-[150px] w-[150px] rounded-xl
          flex justify-center items-center
          bg-gradient-to-l from-[#a21caf] via-[#be185d] to-[#b91c1c]"
        >
         Enthusiast </div>
        <div className="h-[150px] w-[150px] rounded-xl m-2 flex justify-center 
        items-center bg-gradient-to-r from-blue-600 to-[#48E5C2]"> Artist </div>
      </div> 
    </>
  )
}