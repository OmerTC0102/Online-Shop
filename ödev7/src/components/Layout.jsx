
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Layout() {
  const [theme, setTheme] = useLocalStorage(
    "assignment7-theme",
    "light"
  );

  return (
    <div className={`app ${theme}`}>
      <NavBar
        theme={theme}
        setTheme={setTheme}
      />

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
}
