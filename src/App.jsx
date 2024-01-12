import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { addTodo, deleteTodo, toggleCheck } from "./redux/todoSlice";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todoSlice);
  const [todoCount, setTodoCount] = useState(0);

  useEffect(() => {
    let count = 0;
    todos.forEach((item) => {
      if (item.todoComplete) {
        count++;
      }
    });
    setTodoCount(count);
  }, [todos]);

  const handleAddTodo = () => {
    const newTodo = {
      todoTitle: todoInput,
      todoComplete: false,
    };
    dispatch(addTodo(newTodo));
    setTodoInput("");
  };

  const handleDelete = (todoTitle) => {
    dispatch(deleteTodo(todoTitle));
  };

  const handleCheck = (item) => {
    dispatch(toggleCheck(item));
  };
  return (
    <>
      <div className="container">
        <h1>Todo List</h1>
        <div className="todo-app">
          <div className="todo-header">
            <input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="enter your todo"
            />
            <button onClick={handleAddTodo} className="button">
              create
            </button>
          </div>
          <div className="todo-body">
            {todos?.length > 0 &&
              todos.map((item, index) => (
                <div
                  style={{
                    opacity: item.todoComplete ? "0.5" : "1",
                  }}
                  key={index}
                  className="todo-item"
                >
                  <input
                    checked={item?.todoComplete}
                    onChange={() => handleCheck(item)}
                    type="checkbox"
                  />
                  <p>{item.todoTitle}</p>
                  <button
                    onClick={() => handleDelete(item.todoTitle)}
                    className="button delete"
                  >
                    delete
                  </button>
                </div>
              ))}
          </div>
        </div>
        <p style={{ paddingInline: "1rem" }}>
          Total completed items: {todoCount}
        </p>
      </div>
    </>
  );
}

export default App;
