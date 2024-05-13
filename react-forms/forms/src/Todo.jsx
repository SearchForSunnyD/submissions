import "./Todo.css"

/**
 * Renders a todo div
 * Inputs:
 *  -task (STRING)
 *  -id (UUID)
 *  -handleRemove (FUNCTION)
 */

function Todo({ id, task, handleRemove }) {
  const remove = () => handleRemove(id)

  console.log(task)
  
  return (
    <div className="todo" id={id}>
      <button onClick={remove}>x</button>
      <span> {task} </span>
    </div>
  );
}

export default Todo
