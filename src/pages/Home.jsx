import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';
import running from "../assets/running.png";
import natacion from "../assets/natacion.png";
import futbol from "../assets/futbol.png";
import crossfit from "../assets/crossfit.png";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => setProducts(data.slice(0, 6)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">

      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-title">
            RS<br />
            <em>SPORT </em>
          </h1>

          <p className="hero-sub">
            Todo lo que necesitas para superar tus límites
          </p>

          <Link to="/productos" className="hero-cta">
            Ver colección →
          </Link>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80"
            alt="Deportista"
            className="hero-img"
          />
        </div>
      </section>

      <div className="secund">
        <section className="quick-cats">

          <Link
            to="/productos?category=running"
            className="cat-chip"
          >
            <img src={running} alt="Running" />
            <span className="texto">Running</span>
          </Link>

          <Link
            to="/productos?category=natacion"
            className="cat-chip"
          >
            <img src={natacion} alt="Natación" />
            <span>Natación</span>
          </Link>

          <Link
            to="/productos?category=futbol"
            className="cat-chip"
          >
            <img src={futbol} alt="Fútbol" />
            <span>Fútbol</span>
          </Link>

          <Link
            to="/productos?category=crossfit"
            className="cat-chip"
          >
            <img src={crossfit} alt="Crossfit" />
            <span>Crossfit</span>
          </Link>

        </section>
      </div>

      <section className="featured">
        <div className="section-header">
          <h2 className="section-title">Lo más nuevo</h2>
          <Link to="/productos" className="see-all">
            Ver todo →
          </Link>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <p>Pronto habrá productos disponibles.</p>
            <Link to="/productos" className="btn-primary-lg">
              Explorar
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="banner">
        <div className="banner-content">
          <h3>Envío gratis en compras mayores a $100.000</h3>
          <p>Comprá hoy y recibí en 24 – 48 hs en todo el país.</p>
        </div>
      </section>

    </div>
  );
}