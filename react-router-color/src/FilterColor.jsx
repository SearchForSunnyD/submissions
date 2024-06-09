import { useParams } from "react-router-dom";

import { ColorDetails } from "./ColorDetails";

export function FilterColor({ colors }) {


  const { color } = useParams();
  if (!color) return null
  
  return <ColorDetails color={color} key={color} />;
}
