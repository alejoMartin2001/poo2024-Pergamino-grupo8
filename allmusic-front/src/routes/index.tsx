
import { createBrowserRouter } from 'react-router';

import { Header } from '@shared/header/Header';

<<<<<<< HEAD
import { Login, Preview, Register } from '../pages';
import { Error404 } from '@shared/page/Error404';

=======
import { Login, Preview, Register, Home } from '../pages';
import { Error404 } from '@shared/Error/Error404';
>>>>>>> 04eee68c958c5e0092895875141212a02c824688

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/navbar",
    element: <Header />
  },
  {
    path: "/",
    element: <Preview /> 
  },
  {
    path: "/home",
    element: <Home /> 
  },
  // Ruta de error 404 para cualquier URL no encontrada
  {
    path: "*",  // * es un comodín que captura todas las rutas no coincidentes
    element: <Error404 />
  }
]);
