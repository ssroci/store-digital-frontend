import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CompraExitosa.css';

export default function CompraExitosa() {
  const navigate = useNavigate();
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, []);

  return (
    <div className="compra-page">
      <div className="compra-icon"> ✔ </div>
      <h1 className="compra-title">¡Compra registrada con éxito!</h1>
      <p className="compra-desc">
        Gracias por tu compra. En breve recibirás un email con los detalles.
      </p>
      <button className="compra-btn" onClick={() => navigate('/productos')}>
        Seguir comprando
      </button>
    </div>
  );
}