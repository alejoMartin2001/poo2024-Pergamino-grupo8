
interface Props {
  size?: number;
  colorHex?: string;
}

export const LoaderSpinner = ({ size = 20, colorHex = 'db2777' }: Props) => {
  return (
    <div className="flex items-center justify-center flex-1">
        <div className={`w-${size} h-${size} bg-transparent border-3 border-[#${colorHex}] border-r-transparent animate-spin rounded-full`}/>
    </div>
  )
}
