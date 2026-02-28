import { useAuth } from '@/app/providers/AuthProvider';
import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function Topbar() {
  const { logout } = useAuth();
  const logoRef = useRef<HTMLHeadingElement>(null);
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close drawer when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return;
    const { left, top, width, height } = logoRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (e.clientX - centerX) / 8;
    const moveY = (e.clientY - centerY) / 8;
    setLogoPos({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setLogoPos({ x: 0, y: 0 });
  };

  const navItems = [
    { to: '/dashboard', label: 'Estatísticas' },
    { to: '/eventos', label: 'Eventos' },
    { to: '/participantes', label: 'Participantes' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-24 bg-[#FF4D3D] border-b-4 border-[#1A1A1A] flex items-center justify-between px-4 lg:px-12 z-50">
        <div className="flex items-center gap-4 lg:gap-12">
          {/* Hamburger — mobile + tablet */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#FAF6EF] hover:bg-[#1A1A1A] border-2 border-transparent hover:border-[#1A1A1A] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <h1
            ref={logoRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="text-4xl lg:text-5xl font-cinema font-normal text-[#FAF6EF] tracking-wider uppercase relative group cursor-default transition-transform duration-100 ease-out"
            style={{ transform: `translate(${logoPos.x}px, ${logoPos.y}px)` }}
          >
            <span
              className="relative z-10 block"
              style={{ textShadow: '4px 4px 0 #2D5BFF, 8px 8px 0 #FF2DAA, 12px 12px 0 #1A1A1A' }}
            >
              Carva
            </span>
          </h1>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 mt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  font-display text-xl lg:text-2xl uppercase tracking-wider transition-all duration-200 px-4 py-2 border-2
                  ${isActive
                    ? 'bg-[#FAF6EF] text-[#1A1A1A] border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] -translate-y-[2px]'
                    : 'bg-transparent text-[#FAF6EF] border-transparent hover:border-[#1A1A1A] hover:bg-[#2D5BFF] hover:text-[#FAF6EF] hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-[2px]'}
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden sm:block text-right text-[#FAF6EF] mt-1">
            <p className="text-sm font-bold uppercase tracking-wider">Modo Criador</p>
          </div>
          <button
            onClick={logout}
            className="hidden lg:block bg-[#2D5BFF] text-[#FAF6EF] hover:bg-[#FF2DAA] hover:text-[#1A1A1A] px-6 py-2 border-2 border-[#1A1A1A] rounded-full font-display text-xl uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-[2px] mt-1"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Mobile / Tablet Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-0 right-0 bg-[#FF4D3D] border-b-4 border-[#1A1A1A] z-40 lg:hidden shadow-[0px_8px_0px_0px_rgba(26,26,26,1)]"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    font-display text-xl uppercase tracking-wider transition-all duration-200 px-4 py-3 border-2
                    ${isActive
                      ? 'bg-[#FAF6EF] text-[#1A1A1A] border-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]'
                      : 'bg-transparent text-[#FAF6EF] border-transparent hover:border-[#1A1A1A] hover:bg-[#2D5BFF] hover:text-[#FAF6EF]'}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="h-0.5 bg-[#1A1A1A] w-full my-2 opacity-20" />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="bg-[#2D5BFF] text-[#FAF6EF] hover:bg-[#FF2DAA] hover:text-[#1A1A1A] px-4 py-3 border-2 border-[#1A1A1A] font-display text-xl uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-left"
              >
                Sair
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
