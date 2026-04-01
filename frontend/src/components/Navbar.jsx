import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const links = [
  { to: '/contactos', label: 'Contactos' },
  { to: '/campana', label: 'Campaña' },
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
      <div className="w-full px-6 py-4 flex items-center justify-evenly">
        {/* Desktop links + logo */}
        <NavLink to="/contactos" className={({ isActive }) => `${linkClass({ isActive })} hidden md:block`}>
          Contactos
        </NavLink>
        <NavLink to="/campana" className={({ isActive }) => `${linkClass({ isActive })} hidden md:block`}>
          Campaña
        </NavLink>

        <NavLink to="/" className="flex-shrink-0">
          <img src={logo} alt="Tú ere' de aquí" className="h-36 w-auto" />
        </NavLink>

        <NavLink to="/educacion" className={({ isActive }) => `${linkClass({ isActive })} hidden md:block`}>
          Educación
        </NavLink>
        <NavLink to="/unete" className={({ isActive }) => `${linkClass({ isActive })} hidden md:block`}>
          Únete
        </NavLink>

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
