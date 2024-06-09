import { useEffect, useState } from "react";

import data from "./assets/defaultColors.json";

import { Item } from "./Item";

export function ColorList() {
  const [colors, setColors] = useState([...data.colors]);

  const storedColors = localStorage.getItem("userColors") || [];

  useEffect(() => {
    if (storedColors.length > 0) {
      setColors([...storedColors.split(",").reverse(), ...colors]);
    }
  }, []);
  return (
    <div className="color-list" >
      {colors.map((color) => {
        return <Item color={color} key={color} />
      })}
    </div>
  )
}
