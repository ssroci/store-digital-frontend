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
        </div>
      </div>
    </div>
  );
}
