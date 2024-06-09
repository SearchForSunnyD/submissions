import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ColorForm.css";

import data from "./assets/crossBrowserColors.json";

export function ColorForm() {
  const [color, setColor] = useState("aliceblue");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let userColors = localStorage.getItem("userColors").split(",") || [];

    userColors.push(e.target.elements.colors.value);

    localStorage.setItem("userColors", userColors);
    
  
    return navigate("/");
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="picker"
      style={{ backgroundColor: `${color}` }}
    >
      <select name="colors" id="colors" onChange={handleColorChange}>
        {data.colors.map((color, idx) => {
          return (
            <option value={color} key={idx}>
              {color}
            </option>
          );
        })}
      </select>
      <button >Submit</button>
    </form>
  );
}
