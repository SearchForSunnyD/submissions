import { useState } from "react";
import heads from "./heads.png";
import tails from "./tails.png";
import "./Coin.css"

function Coin() {
  const [headsCounter, setHeadsCounter] = useState(0);
  const [tailsCounter, setTailsCounter] = useState(0);
  const [coinFace, setCoinFace] = useState(0);

  let img = coinFace === 0 ? heads : tails;

  //return 0 or 1
  function coinFlip() {
    return Math.floor(Math.random() * 2);
  }

  //flip and set the coin
  function setCoin() {

    const flip = coinFlip()

    if (flip === 0) {
      setCoinFace(0);
      setHeadsCounter(headsCounter + 1);
    } else {
      setCoinFace(1);
      setTailsCounter(tailsCounter + 1);
    }
    console.log(flip)
  }

  return (
    <div className="Coin">
      {headsCounter + tailsCounter > 0 && (
        <img className="Coin-img" src={img} alt="coin"></img>
      )}
      <div className="Counters">
        <span>heads: {headsCounter}</span> <span>tails: {tailsCounter}</span>
      </div>
      <button className="flipCoin" onClick={setCoin}> Flip </button>
    </div>
  );
}

export default Coin;
