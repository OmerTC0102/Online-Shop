
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { useCartStore } from "../store/cartStore";

export default function NavBar({ theme, setTheme }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const itemCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  function handleLogout() {
    logoutUser();
    navigate("/", { replace: true });
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <nav className="navbar">
      <h2>MyShop</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/products">Products</NavLink>

        <NavLink to="/cart">
             Cart ({itemCount})
             </NavLink>

        {user ? (
          <div className="user-section">
            <span>{user.username}</span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}

        <button onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
}
