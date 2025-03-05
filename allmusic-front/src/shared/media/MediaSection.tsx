import { MediaCard } from "./MediaCard";

interface Props {
  rows?: number;
  columns?: number;
}

export const MediaSection = ({ rows = 1, columns = 4 }: Props) => {
  return (
    <div className={`grid gap-3`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`}}
    >
      {[...Array(rows * columns)].map((_, index) => <MediaCard key={index}/>)}
    </div>
  )
}