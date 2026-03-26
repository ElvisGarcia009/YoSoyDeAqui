import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/sobre-nosotros', label: 'Sobre nosotros' },
  { to: '/contactos', label: 'Contáctos' },
  { to: '/educacion', label: 'Educación' },
  { to: '/unete', label: 'Únete' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-teal font-semibold'
      : 'text-white hover:text-teal transition-colors duration-200';

  return (
    <nav className="bg-dark sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left links (desktop) */}
        <div className="hidden md:flex items-center gap-10 flex-1">
          <NavLink to="/contactos" className={linkClass}>
            Contáctos
          </NavLink>
        </div>

        {/* Logo (centered) */}
        <NavLink to="/" className="flex-shrink-0 mx-auto md:mx-0">
          <div className="text-center leading-tight">
            <div className="font-heading text-white text-2xl font-black tracking-wide">
              <span className="text-coral italic">Tú</span>{' '}
              <span className="text-white">ERE&apos;</span>
            </div>
            <div className="font-heading text-2xl font-black tracking-wide">
              <span className="text-white">DE </span>
              <span className="text-teal italic">aquí</span>
            </div>
          </div>
        </NavLink>

        {/* Right links (desktop) */}
        <div className="hidden md:flex items-center gap-10 flex-1 justify-end">
          <NavLink to="/educacion" className={linkClass}>
            Educación
          </NavLink>
          <NavLink to="/unete" className={linkClass}>
            Únete
          </NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-white ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark border-t border-gray-700 px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={() => setMenuOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
