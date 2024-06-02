import { Link } from "react-router-dom";

export function Item({ data }) {
  return (
    <div>
      <div>
        <img src={data.img} alt={`image of ${data.name}`} />
      </div>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}
