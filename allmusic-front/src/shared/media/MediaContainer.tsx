
interface Props {
  title: string;
  children: React.ReactNode
}

export const MediaContainer = ({ title, children }: Props) => {
  return (
    <div className="w-full max-w-7xl mx-auto mb-4 max-2xl:px-4 py-6 text-white">
      <h2 className="text-2xl font-semibold mb-2 ml-2">{title}</h2>
      {children}
    </div>
  )
}