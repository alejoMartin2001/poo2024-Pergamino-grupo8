
import { createBrowserRouter } from 'react-router';

import { Header } from '@shared/components/header/Header';

import { Login, Preview, Register } from '../pages';

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
  }
]);
