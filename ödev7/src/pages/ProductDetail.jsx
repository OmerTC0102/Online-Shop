
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchProduct } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addItem = useCartStore((state) => state.addItem);

  const loadProduct = useCallback(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  const { loading, error, data } = useFetch(
    loadProduct,
    [id]
  );

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return (
      <section>
        <h2>Product not found</h2>
        <p>{error}</p>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </section>
    );
  }

  return (
    <section className="product-detail">
      <img src={data.thumbnail} alt={data.title} />

      <div>
        <h1>{data.title}</h1>

        <p>{data.description}</p>

        <p>Category: {data.category}</p>

        <h2>${data.price.toFixed(2)}</h2>

        <button onClick={() => addItem(data)}>
          Add to Cart
        </button>

        <button onClick={() => navigate("/products")}>
          Back
        </button>
      </div>
    </section>
  );
}
