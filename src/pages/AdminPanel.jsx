import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './AdminPanel.css';

const EMPTY_FORM = {
  title: '',
  description: '',
  price: '',
  fileUrl: '',
  category: '',
};

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

 
  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get('/products'),
      api.get('/categories'),
    ])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.data);
        setCategories(catRes.data);
      })
      .catch(() => setError('Error al cargar datos'))
      .finally(() => setLoadingData(false));
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        ...form,
        price: parseFloat(form.price),
      };

      if (editingId) {
        const { data } = await api.put(`/products/${editingId}`, payload, config);
        setProducts(products.map((p) => (p._id === editingId ? data : p)));
        setSuccess('Producto actualizado correctamente');
      } else {
        const { data } = await api.post('/products', payload, config);
        setProducts([data, ...products]);
        setSuccess('Producto creado correctamente');
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el producto');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      fileUrl: product.fileUrl,
      category: product.category?._id || product.category || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    setError('');
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      setSuccess('Producto eliminado');
    } catch {
      setError('Error al eliminar el producto');
    }
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError('');
  };

  if (loading || loadingData) return <div className="admin-loading">Cargando...</div>;

  return (
    <div className="admin-panel">
      <h1 className="admin-title">Panel de Administración</h1>

      {}
      <section className="admin-form-section">
        <h2>{editingId ? 'Editar producto' : 'Nuevo producto'}</h2>

        {error && <p className="admin-error">{error}</p>}
        {success && <p className="admin-success">{success}</p>}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Nombre del producto"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción del producto"
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio ($)</label>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Seleccioná una categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>URL de imagen</label>
            <input
              name="fileUrl"
              value={form.fileUrl}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </div>

          {form.fileUrl && (
            <div className="img-preview">
              <img src={form.fileUrl} alt="Preview" />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editingId ? 'Guardar cambios' : 'Crear producto'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {}
      <section className="admin-list-section">
        <h2>Productos ({products.length})</h2>
        {products.length === 0 ? (
          <p className="empty">No hay productos todavía.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.fileUrl}
                        alt={p.title}
                        className="table-img"
                      />
                    </td>
                    <td>{p.title}</td>
                    <td>${Number(p.price).toLocaleString('es-AR')}</td>
                    <td>{p.category?.name || '—'}</td>
                    <td className="table-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(p)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}