import AlertStack, { Alert, AlertStackRef } from './AlertStack';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react';

interface AlertStackState {
  id: number;
  alerts: Alert[];
}

interface AlertStackProviderProps {}

interface AlertStackContextValue {
  pushAlert: (alert: Omit<Alert, 'id'>) => void;
}

const AlertStackContext = createContext<AlertStackContextValue>({
  pushAlert: () => {},
});

const AlertStackProvider = ({
  children,
}: PropsWithChildren<AlertStackProviderProps>) => {
  const alertStackStateRef = useRef<AlertStackState>({ id: 0, alerts: [] });
  const alertStackRef = useRef<AlertStackRef>(null);

  const pushAlert = useCallback((alert: Omit<Alert, 'id'>) => {
    const id = ++alertStackStateRef.current.id;

    alertStackStateRef.current.alerts.push({ ...alert, id });
    if (alertStackRef.current) {
      alertStackRef.current.setAlerts([...alertStackStateRef.current.alerts]);
    }
    setTimeout(() => {
      alertStackStateRef.current.alerts =
        alertStackStateRef.current.alerts.filter(alert => alert.id > id);
      if (alertStackRef.current) {
        alertStackRef.current.setAlerts(alertStackStateRef.current.alerts);
      }
    }, 3000);
  }, []);

  return (
    <AlertStackContext.Provider value={{ pushAlert }}>
      {children}
      <AlertStack ref={alertStackRef} />
    </AlertStackContext.Provider>
  );
};

export const useAlertStack = () => useContext(AlertStackContext);

export default AlertStackProvider;
