
import { createBrowserRouter } from 'react-router';

import { Example, Home, Login, Preview, Register } from '../pages';
import { Error404 } from '@shared/page/Error404';
import { ConfigUser } from '@components/configUser/ConfiguracionUser';

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
    path: "/",
    element: <Preview /> 
  },
  {
    path: "/home",
    element: <Home /> 
  },
  {
    path: "/example",
    element: <Example /> 
  },
  // Ruta de error 404 para cualquier URL no encontrada
  {
    path: "/configUser",
    element: <ConfigUser />
  },
  {
    path: "*",  // * es un comodín que captura todas las rutas no coincidentes
    element: <Error404 />
  }
]);
