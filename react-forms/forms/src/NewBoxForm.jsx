import { useState } from "react";
import { v4 as uuid } from "uuid";

/*
Creates a form to add boxes
Inputs:
  -handleAdd (FUNCTION)
Outputs:
  -Form to add boxes
*/

function NewBoxForm({ handleAdd }) {
  const initialState = {
    backgroundColor: "",
    height: "",
    width: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { backgroundColor, height, width } = formData;
    handleAdd({ backgroundColor, height, width, id: uuid() });
    setFormData(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="backgroundColor">Background Color: </label>
          <input
            onChange={handleChange}
            type="text"
            name="backgroundColor"
            id="backgroundColor"
            value={formData.backgroundColor}
          />
          <label htmlFor="height">Height: </label>
          <input
            onChange={handleChange}
            type="text"
            name="height"
            id="height"
            value={formData.height}
          />
          <label htmlFor="width">Width: </label>
          <input
            onChange={handleChange}
            type="text"
            name="width"
            id="width"
            value={formData.width}
          />
        </div>
        <button id="submitBox">Submit</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
