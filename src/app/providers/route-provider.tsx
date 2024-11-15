import { ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

interface RouteProviderProps {
  children: ReactNode;
}

function RouteProvider({ children }: RouteProviderProps) {
  return (
    <BrowserRouter basename={(import.meta.env.VITE_ROUTER_BASE as string | undefined) || '/'}>
      {children}
    </BrowserRouter>
  );
}

export default RouteProvider;
