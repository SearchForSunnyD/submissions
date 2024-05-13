import { useState } from "react";
import { v4 as uuid } from "uuid";

/*
* Creates a form to add todos
* Inputs:
* -handleAdd (FUNCTION)
* Outputs:
*   -Form to add todos
*/

function NewTodoForm({ handleAdd }) {
  const initialState = {
    todo: ""
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
    const { todo } = formData;
    handleAdd({ todo, id: uuid() });
    setFormData(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo">Task to add: </label>
          <input
            onChange={handleChange}
            type="text"
            name="todo"
            id="todo"
            value={formData.todo}
          />
        </div>
        <button id="submitBox">Submit</button>
      </form>
    </div>
  );
}

export default NewTodoForm;
