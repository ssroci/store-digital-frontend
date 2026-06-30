import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Token de verificación no encontrado.');
      return;
    }

    api.get(`/auth/verify-email?token=${token}`)
      .then(({ data }) => {
        setStatus('success');
        setMessage(data.message || 'Cuenta verificada correctamente.');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'El link es inválido o ya fue usado.');
      });
  }, [searchParams]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">RS SPORT</div>

        {status === 'loading' && (
          <div className="auth-success">
            <h2>Verificando tu cuenta...</h2>
            <p>Por favor esperá un momento.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="auth-success">
            <h2>✅ ¡Cuenta verificada!</h2>
            <p>{message}</p>
            <button
              className="auth-submit"
              onClick={() => navigate('/login', { state: { message: '¡Cuenta verificada! Ya podés iniciar sesión.' } })}
            >
              Iniciar sesión
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="auth-success">
            <h2>❌ Error de verificación</h2>
            <p>{message}</p>
            <button
              className="auth-submit"
              onClick={() => navigate('/register')}
            >
              Volver al registro
            </button>
          </div>
        )}
      </div>
    </div>
  );
}