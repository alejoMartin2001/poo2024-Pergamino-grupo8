import { MediaSection } from "@shared/media/MediaSection";


export const Album = () => {
  return (
    <div className="flex flex-col">
      <MediaSection columns={6}/>
      <MediaSection columns={6}/>
    </div>
  );
};