import { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

/*
 * Creates a form to add new todos to a div and add the todos when submitted
 * Inputs:
 *   -None
 * Outputs:
 *   Component with a form and todo container
 */

function TodoList() {
  const [todos, setTodos] = useState([]);

  const add = (todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  const remove = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const todoList = todos.map((todo) => (
    <Todo key={todo.id} id={todo.id} task={todo.todo} handleRemove={remove} />
  ));

  return (
    <div>
      <NewTodoForm handleAdd={add} />
      {todoList}
    </div>
  );
}

export default TodoList;
