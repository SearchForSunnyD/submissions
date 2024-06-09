import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/colors/new">Add Color</NavLink>
    </nav>
  );
}
