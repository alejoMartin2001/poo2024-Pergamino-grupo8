
import { createBrowserRouter } from 'react-router';

import { Header } from '@shared/header/Header';

import { Home, Login, Preview, Register } from '../pages';
import { Error404 } from '@shared/page/Error404';

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
