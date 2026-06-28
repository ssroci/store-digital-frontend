import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
   
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
        <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
        <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
      </button>


      <Link to="/" className="navbar-brand" onClick={closeMenu}>
        <span className="brand-name">RS SPORT</span>
      </Link>

     
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
      </ul>

      
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="navbar-user">Hola, {user.name.split(' ')[0]}</span>
            <button className="btn-ghost" onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-ghost">Iniciar sesión</Link>
            <Link to="/register" className="btn-primary">Registrarse</Link>
          </>
        )}
        <Link to="/carrito" className="cart-btn">
          🛒
          {items.length > 0 && <span className="cart-badge">{items.length}</span>}
        </Link>
      </div>

      {}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={closeMenu}>Inicio</Link>
          <Link to="/productos" className="mobile-link" onClick={closeMenu}>Productos</Link>
          <div className="mobile-divider" />
          {user ? (
            <>
              <span className="mobile-user">Hola, {user.name.split(' ')[0]}</span>
              <button className="mobile-link mobile-logout" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={closeMenu}>Iniciar sesión</Link>
              <Link to="/register" className="mobile-link mobile-register" onClick={closeMenu}>Registrarse</Link>
            </>
          )}
          <Link to="/carrito" className="mobile-link" onClick={closeMenu}>
            🛒 Carrito {items.length > 0 && `(${items.length})`}
          </Link>
        </div>
      )}
    </nav>
  );
}