
import { Link } from "react-router";

export default function Home() {
  return (
    <section className="home-page">
      <h1>Welcome to MyShop!</h1>

      <p>
        Discover amazing products at great prices.
      </p>

      <Link className="primary-button" to="/products">
        Explore Products
      </Link>
    </section>
  );
}
