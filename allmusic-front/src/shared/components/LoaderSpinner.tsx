
interface Props {
  size?: number;
  colorHex?: string;
}

export const LoaderSpinner = ({ size = 36, colorHex = 'db2777' }: Props) => {
  return (
    <div
      className="inline-block animate-spin rounded-full border-4 border-solid border-r-transparent"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size / 8}px`,
        borderColor: `#${colorHex}`,
        borderRightColor: "transparent",
      }}
    />
  )
}
