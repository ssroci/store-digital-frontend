import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

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
      <h1>
        {category ? `Categoría: ${category}` : "Todos los productos"}
      </h1>

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