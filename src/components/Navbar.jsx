import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
  
        <span className="brand-name">Indumentaria y Accesorios </span>
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
    </nav>
  );
}
