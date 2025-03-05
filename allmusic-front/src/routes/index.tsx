
import { Route, Routes } from 'react-router';
import { useAuth } from 'src/contexts/AuthProvider';

import { Error404 } from '@shared/page/Error404';

import { Home, Login, Preview, Register } from '../pages';

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {/* Rutas no definidas */}
      <Route path="/" element={<Error404 />} />
    </Routes>
  );
};
