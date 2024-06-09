import { Link } from "react-router-dom";
import "./Item.css";

export function Item({ color }) {
  return (
    <div className="color" style={{backgroundColor: `${color}`}} >
      <Link to={`/colors/${color}`}>
        <button><p></p></button>
      </Link>
    </div>
  );
}
