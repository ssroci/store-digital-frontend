import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addItem, items } = useCart();

  const inCart = items.some(i => i._id === product._id);

  const addToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card" onClick={() => navigate(`/productos/${product._id}`)}>
      <div className="product-img-wrap">
        <img src={product.fileUrl} alt={product.title} className="product-img" />
        {product.category?.name && (
          <span className="product-category">{product.category.name}</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toLocaleString()}</span>
          <button
            className={`btn-cart ${inCart ? 'in-cart' : ''}`}
            onClick={addToCart}
            disabled={inCart}
          >
            {inCart ? '✓ Agregado' : '+ Carrito'}
          </button>
        </div>
      </div>
    </div>
  );
}