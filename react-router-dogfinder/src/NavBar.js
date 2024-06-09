import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function NavBar({ dogs }) {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      {dogs.map((dog) => {
        return (
          <NavLink to={`/dogs/${dog.name.toLowerCase()}`} key={dog.name}>
            {dog.name}
          </NavLink>
        );
      })}
    </nav>
  );
}
