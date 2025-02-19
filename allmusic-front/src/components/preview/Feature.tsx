
interface Props {
  image: string;
  title: string;
  description: string;
}

export const Feature = ({image, title, description}: Props) => {
  return (
    <div className="flex flex-col text-white bg-gray-800 p-5 rounded-2xl hover:scale-[1.01] transition-all">
      <div className="flex items-center mb-4">
        <img src={image} alt="icon" className="w-auto h-15"/>
        <h1 className="text-xl font-medium ml-3">{title}</h1>
      </div>

      <div className="font-normal text-gray-400">
        {description}
      </div>

    </div>
  )
}