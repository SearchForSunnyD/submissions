import { Link } from "react-router-dom";
import "./VendingMachine.css"

export function VendingMachine() {
  return (
    <div className="vending-machine">
      <Link to="/chips">
        <button>Chips</button>
      </Link>
      <Link to="/chocolate">
        <button>Chocolate</button>
      </Link>
      <Link to="/gum">
        <button>Gum</button>
      </Link>
    </div>
  );
}
