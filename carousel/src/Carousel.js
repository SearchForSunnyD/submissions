import { useState } from "react";
import Card from "./Card";
import "./Carousel.css";

/** Carousel: displays images and arrows to navigate through them
 *
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 *
 * State:
 * - currCardIdx: integer for current card index
 *
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    if (currCardIdx < total - 1) setCurrCardIdx(currCardIdx + 1);
    else setCurrCardIdx(0);
  }

  //Decrements currCardIdx state by 1
  function goBackward() {
    if (currCardIdx > 0) setCurrCardIdx(currCardIdx - 1);
    else setCurrCardIdx(total - 1);
    
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {
          currCardIdx > 0 &&
        <i className="bi bi-arrow-left-circle" onClick={goBackward} />
        }
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {
          currCardIdx < total - 1 &&
          <i className="bi bi-arrow-right-circle" onClick={goForward} />
        }
      </div>
    </div>
  );
}

export default Carousel;
