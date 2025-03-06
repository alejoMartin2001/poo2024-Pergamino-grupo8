
interface Props {
  title: string;
  children: React.ReactNode
}

export const MediaContainer = ({ title, children }: Props) => {
  return (
    <div className="w-full max-w-7xl mx-auto mb-4 px-4 text-white">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}