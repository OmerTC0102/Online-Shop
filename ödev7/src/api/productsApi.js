
const BASE_URL = "https://dummyjson.com/products";

// Fetch all products
export async function fetchProducts(signal) {
  const response = await fetch(`${BASE_URL}?limit=100`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const data = await response.json();

  return data.products;
}

// Fetch a single product by ID
export async function fetchProduct(id, signal) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Product not found.");
  }

  return await response.json();
}
