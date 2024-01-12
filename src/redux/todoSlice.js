import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (store, action) => {
      store.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const newTodos = state.todos.filter(
        (item) => item?.todoTitle != action.payload,
      );
      state.todos = [...newTodos];
    },
    toggleCheck: (state, action) => {
      const currentTodo = state.todos.find(
        (item) => item.todoTitle == action.payload.todoTitle,
      );
      currentTodo.todoComplete = !action.payload.todoComplete;
      const newTodo = state.todos.filter(
        (item) => item.todoTitle != action.payload.todoTitle,
      );
      state.todos = [...newTodo, currentTodo];
    },
  },
});

export const { addTodo, deleteTodo, toggleCheck } = todoSlice.actions;
export default todoSlice.reducer;
