import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem, items } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => navigate('/productos'))
      .finally(() => setLoading(false));
  }, [id]);

  const inCart = items.some(i => i._id === id);

  const handleAdd = () => {
    if (!user) {
      navigate('/login', { state: { from: `/productos/${id}`, message: 'Iniciá sesión para agregar al carrito' } });
      return;
    }
    addItem(product);
  };

  if (loading) return <div className="detail-loading">Cargando...</div>;
  if (!product) return null;

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>

      <div className="detail-grid">
        <div className="detail-img-wrap">
          <img
         src={product.fileUrl}
            alt={product.title}
            className="detail-img"
          />
        </div>

        <div className="detail-info">
          {product.category?.name && (
            <span className="detail-category">{product.category.name}</span>
          )}
          <h1 className="detail-title">{product.title}</h1>
          {product.size && (
            <span className="detail-size">Talle: {product.size}</span>
          )}
          <p className="detail-desc">{product.description}</p>

          {product.tags?.length > 0 && (
            <div className="detail-tags">
              {product.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          )}

          <div className="detail-price-row">
            <span className="detail-price">${product.price.toLocaleString('es-AR')}</span>
          </div>

          <button
            className={`btn-add-cart ${inCart ? 'in-cart' : ''}`}
            onClick={handleAdd}
            disabled={inCart}
          >
            {inCart ? '✓ En el carrito' : 'Agregar al carrito'}
          </button>

          {!user && (
            <p className="detail-hint">
              <button className="link-btn" onClick={() => navigate('/login')}>Iniciá sesión</button>
              {' '}para agregar al carrito.
            </p>
          )}

          <div className="benefits-row">
            <div className="benefit-card">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <p>Pagá hasta en 6 cuotas sin interés*</p>
            </div>
            <div className="benefit-card">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9.5 12 3l9 6.5" />
                <path d="M5 10v10h14V10" />
                <line x1="9" y1="20" x2="9" y2="14" />
                <line x1="15" y1="20" x2="15" y2="14" />
              </svg>
              <p>Retiralo Gratis en nuestras sucursales</p>
            </div>
            <div className="benefit-card">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
                <path d="M3 8l9 5 9-5" />
                <line x1="12" y1="13" x2="12" y2="21" />
              </svg>
              <p>Recibilo Gratis</p>
            </div>
            <div className="benefit-card">
              <svg className="benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 2 21 6l-4 4" />
                <path d="M3 12v-2a4 4 0 0 1 4-4h14" />
                <path d="M7 22 3 18l4-4" />
                <path d="M21 12v2a4 4 0 0 1-4 4H3" />
              </svg>
              <p>Primer Cambio gratis*</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}