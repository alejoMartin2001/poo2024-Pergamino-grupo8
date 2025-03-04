
import { AlertProvider } from './contexts/AlertProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { CreateAppRouter } from './routes';

export const App = () => {

  return (
    <AuthProvider>
      <AlertProvider>
        <CreateAppRouter />
      </AlertProvider>
    </AuthProvider>
  );
};