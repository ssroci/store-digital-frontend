import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';


export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `/products?category=${category}`
          : "/products";

        const { data } = await api.get(url);
        setProducts(data);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
   <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
    <div className="productos-header">
  <BackButton />
   <Link to="/carrito" className="ver-carrito-mobile">Ver carrito 🛒</Link>
  </div>
  {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}