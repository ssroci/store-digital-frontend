import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Carrito.css';

export default function Carrito() {
  const { items, removeItem, clear, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="carrito-page">
        <div className="carrito-empty">
      
          <h2>Iniciá sesión para ver tu carrito</h2>
          <p>Necesitás una cuenta para guardar productos.</p>
          <button className="btn-checkout" onClick={() => navigate('/login')}>
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="carrito-page">
        <div className="carrito-empty">
          <div className="empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agregá productos desde la tienda.</p>
          <button className="btn-checkout" onClick={() => navigate('/productos')}>
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-page">
      <h1 className="carrito-title">Tu carrito</h1>

      <div className="carrito-layout">
       
        <div className="carrito-items">
          {items.map(item => (
            <div key={item._id} className="cart-item">
              <img
                src={item.fileUrl}
                alt={item.title}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                {item.category?.name && <span className="cart-item-cat">{item.category.name}</span>}
              </div>
              <div className="cart-item-right">
                <span className="cart-item-price">${item.price.toLocaleString('es-AR')}</span>
                <button className="remove-btn" onClick={() => removeItem(item._id)}>✕</button>
              </div>
            </div>
          ))}

          <button className="clear-btn" onClick={clear}>Vaciar carrito</button>
        </div>

      
        <div className="carrito-summary">
          <h2>Resumen</h2>
          <div className="summary-row">
            <span>Subtotal ({items.length} productos)</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="free-shipping">Gratis</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toLocaleString('es-AR')}</span>
          </div>
         <button className="btn-checkout" onClick={() => navigate('/compra-exitosa')}>
  Finalizar compra
</button>

          <button className="btn-continue" onClick={() => navigate('/productos')}>
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}
