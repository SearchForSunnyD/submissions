import "./Box.css"

/**
Creates a single box component
Inputs:
  -id (UUID)
  -backgroundColor (STRING)
  -height (INT)
  -width (INT)
  -remove (FUNCTION)

Outputs:
  -Box element of the desired size and color with a remove button
**/

function Box({ id, backgroundColor = "red", height = 10, width = 10, handleRemove }) {
  const remove = () => handleRemove(id)
  
  return (
    <div
      className="box"
      style={{ backgroundColor, height: height + "em", width: width + "em" }}
      id={id}
    >
      <button onClick={remove}>x</button>
    </div>
  );
}

export default Box
