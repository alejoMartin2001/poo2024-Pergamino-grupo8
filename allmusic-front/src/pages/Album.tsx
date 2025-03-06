import { MediaContainer } from "@shared/media/MediaContainer";
import { MediaSection } from "@shared/media/MediaSection";
import albumImage from "@images/album/20230607_190836.jpg"


const albums = [
  { image: albumImage, title: "Album 1", subtitle: "Artist 1" },
  { image: albumImage, title: "Album 2", subtitle: "Artist 2" },
];

const playlists = [
  { image: albumImage, title: "Chill Vibes", subtitle: "By User123" },
  { image: albumImage, title: "Workout Mix", subtitle: "By User456" },
  { image: albumImage, title: "Chill Vibes", subtitle: "By User123" },
  { image: albumImage, title: "Workout Mix", subtitle: "By User456" },
  { image: albumImage, title: "Chill Vibes", subtitle: "By User123" },
  { image: albumImage, title: "Workout Mix", subtitle: "By User456" },
  { image: albumImage, title: "Workout Mix", subtitle: "By User456" },
];


export const Album = () => {
  return (
    <div className="flex flex-col">
      <MediaContainer title="Álbumes Populares">
        <MediaSection data={albums} />
      </MediaContainer>

      <MediaContainer title="Playlists Destacadas">
        <MediaSection data={playlists} />
      </MediaContainer>
    </div>
  );
};