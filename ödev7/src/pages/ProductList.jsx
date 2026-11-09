
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { fetchProducts } from "../api/productsApi";
import { useFetch } from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";

  const loadProducts = useCallback(
    (signal) => fetchProducts(signal),
    []
  );

  const { loading, error, data } = useFetch(
    loadProducts,
    []
  );

  const categories = useMemo(() => {
    if (!data) return [];

    return [...new Set(data.map((product) => product.category))];
  }, [data]);

  const filteredProducts = (data || []).filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      product.category === selectedCategory;

    return matchesTitle && matchesCategory;
  });

  function handleSearch(event) {
    const newParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }

    setSearchParams(newParams);
  }

  function handleCategory(event) {
    const newParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value) {
      newParams.set("category", value);
    } else {
      newParams.delete("category");
    }

    setSearchParams(newParams);
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <section>
      <h1>Products</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleSearch}
        />

        <select
          value={selectedCategory}
          onChange={handleCategory}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <p>{filteredProducts.length} products found</p>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}
