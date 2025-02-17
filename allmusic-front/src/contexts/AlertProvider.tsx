import { Alert } from "@shared/components";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertContextType {
  showAlert: (title: string, message: string, type?: AlertType, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alert, setAlert] = useState<{ 
    title: string;
    message: string; 
    type: AlertType; 
    duration: number;
    id: number;
  } | null>(null);
  const [alertId, setAlertId] = useState(0);

  const showAlert = (title: string, message: string, type: AlertType = "info", duration: number = 5000) => {
    setAlertId(prev => prev + 1); // Incrementa el ID para forzar el cambio
    setAlert({ title, message, type, duration, id: alertId + 1 });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert key={alertId} title={alert.title} message={alert.message} type={alert.type} duration={alert.duration} />}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert debe usarse dentro de un AlertProvider");
  }
  return context;
};
