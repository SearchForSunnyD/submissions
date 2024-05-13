import {useState} from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

/*
Creates a form to add new boxes to a div and add the boxes when submitted
Inputs:
  -None
Outputs:
  Component with a form and box container
*/
function BoxList() {
  const [boxes, setBoxes] = useState([])

  const add = box => {
    setBoxes(boxes => [...boxes, box])
  }

  const remove = id => {
    setBoxes(boxes => boxes.filter(box => box.id !== id))
  }

  const boxList = boxes.map(box => (
    <Box
      key={box.id}
      id={box.id}
      backgroundColor={box.backgroundColor}
      height={box.height}
      width={box.width}
      handleRemove={remove}
    />
  ))

  return (
    <div>
      <NewBoxForm handleAdd={add}/>
      {boxList}
    </div>
  );
}

export default BoxList
