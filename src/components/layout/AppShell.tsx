import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Topbar } from './Topbar';

export function AppShell() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-bg text-ink font-ui">
      <Topbar />
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
}
