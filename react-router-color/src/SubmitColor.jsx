import {  useParams } from "react-router-dom";

export function SubmitColor() {
  const { color } = useParams();
  if (color) {
    let userColors = localStorage.getItem("userColors").split(",") || [];
    
    userColors.push(color)
    
    localStorage.setItem("userColors", userColors);
  }

  console.log("kjadlskjfhlaksdhf")

  return <><p>Yeet</p></>;
}
