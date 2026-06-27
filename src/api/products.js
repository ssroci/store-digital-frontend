const API_URL = "http://localhost:4000/api/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al traer productos");
  return res.json();
};