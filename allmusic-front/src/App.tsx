import { RouterProvider } from 'react-router';

import { AlertProvider } from './contexts/AlertProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { router } from './routes';

export const App = () => {

  return (
    <AuthProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </AuthProvider>
  );
};