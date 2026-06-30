import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>RS SPORT</h3>
          <p>Todo lo que necesitás para superar tus límites.</p>
        </div>

        <div className="footer-col">
          <h4>Categorías</h4>
          <Link to="/productos?category=running">Running</Link>
          <Link to="/productos?category=natacion">Natación</Link>
          <Link to="/productos?category=futbol">Fútbol</Link>
          <Link to="/productos?category=crossfit">Crossfit</Link>
        </div>

        <div className="footer-col">
          <h4>Ayuda</h4>
          <Link to="/productos">Todos los productos</Link>
          <Link to="/carrito">Carrito</Link>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <p>contacto@rssport.com</p>
          <p>Río Negro, Argentina</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RS Sport. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}