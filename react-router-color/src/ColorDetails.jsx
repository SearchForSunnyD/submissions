import "./ColorDetails.css"

export function ColorDetails({ color }) {
  return <div className="fill" style={{ backgroundColor: `${color}` }}></div>;
}
