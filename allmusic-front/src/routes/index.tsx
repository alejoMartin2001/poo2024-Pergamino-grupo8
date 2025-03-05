
import { Route, Routes } from 'react-router';

import { Example, Home, Login, Preview, Register } from '../pages';
import { Error404 } from '@shared/page/Error404';
// import { ConfigUser } from '@components/configUser/ConfiguracionUser';
import { useAuth } from 'src/contexts/AuthProvider';

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
          <Route path="/*" element={<Error404 />} />
        </>
      )}

      {/* Rutas privadas */}
      {isAuth && (
        <>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error404 />} />
        </>  
      )}
      </Routes>
  );
};
