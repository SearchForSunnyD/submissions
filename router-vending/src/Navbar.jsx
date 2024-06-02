import { Link } from "react-router-dom";
import "./Navbar.css"

export function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/chips">Chips</Link>
      <Link to="/chocolate">Chocolate</Link>
      <Link to="/gum">Gum</Link>
    </nav>
  );
}
