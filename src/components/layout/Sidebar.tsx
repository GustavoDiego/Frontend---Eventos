import { NavLink } from 'react-router-dom';
import { Calendar, Users, LayoutDashboard, X } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';

export function Sidebar({ onClose }: { onClose: () => void }) {
  const { logout } = useAuth();
  
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/eventos', icon: Calendar, label: 'Eventos' },
    { to: '/participantes', icon: Users, label: 'Participantes' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <h1 className="text-xl font-display font-normal text-primary">Carva Admin</h1>
        <button onClick={onClose} className="md:hidden p-2 text-muted hover:text-ink">
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-md font-semibold text-sm transition-colors
              ${isActive 
                ? 'bg-secondary/10 text-secondary' 
                : 'text-muted hover:bg-black/5 hover:text-ink'}
            `}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={logout}
          className="w-full flex justify-center items-center py-2 px-4 border border-border rounded-md text-sm font-semibold hover:bg-black/5"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
