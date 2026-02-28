import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
import { AppShell } from '@/components/layout/AppShell';
import { PageTransition } from '@/components/layout/Transitions/PageTransition';

import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ErrorPage } from '@/pages/ErrorPage';
import { Dashboard } from '@/pages/Dashboard';
import { EventsList } from '@/pages/Events/EventsList';
import { EventForm } from '@/pages/Events/EventForm';
import { CheckinRules } from '@/pages/Events/CheckinRules';
import { ParticipantsList } from '@/pages/Participants/ParticipantsList';
import { ParticipantForm } from '@/pages/Participants/ParticipantForm';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Wrap component inside PageTransition for smooth enter/exit animations
const withTransition = (Component: React.ComponentType) => (
  <PageTransition>
    <Component />
  </PageTransition>
);

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: withTransition(Dashboard) },
      { path: 'eventos', element: withTransition(EventsList) },
      { path: 'eventos/novo', element: withTransition(EventForm) },
      { path: 'eventos/:id/editar', element: withTransition(EventForm) },
      { path: 'eventos/:id/regras-checkin', element: withTransition(CheckinRules) },
      { path: 'participantes', element: withTransition(ParticipantsList) },
      { path: 'participantes/novo', element: withTransition(ParticipantForm) },
      { path: 'participantes/:id/editar', element: withTransition(ParticipantForm) },
    ],
  },
]);
