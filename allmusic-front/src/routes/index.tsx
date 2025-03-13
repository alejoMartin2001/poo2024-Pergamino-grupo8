
import { Route, Routes } from 'react-router';
import { useAuth } from 'src/contexts/AuthProvider';

import { Error404 } from '@shared/page/Error404';

import { Album, Home, Login, Playlist, Preview,Register, Setting } from '../pages';
import { Profile } from '@pages/Profile';
import { ArtistProfile } from '@components/profile/ArtistProfile';
import { AlbumView } from '@components/album/AlbumView';
import { PlaylistView } from '@components/playlist/PlaylistView';

export const CreateAppRouter = () => {

  const { isAuth } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      {!isAuth && (
        <>
          <Route path="/" element={<Preview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {/* Rutas privadas */}
      {isAuth && (
        <>
          <Route path="/" element={<Home />} >
            <Route path='albums' element={<Album />}/>
            <Route path='album/:albumId' element={<AlbumView />}/>
            <Route path='settings' element={<Setting />}/>
            <Route path='playlists' element={<Playlist />}/>
            <Route path='playlist/:playlistId' element={<PlaylistView />}/>
            <Route path='profile' element={<Profile />}/>
            <Route path='profileArtist' element={<ArtistProfile />}/>
          </Route>
        </>
      )}

      {/* Rutas no definidas */}
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
};
