// TodoContext.js
import { createContext } from 'react';

const TodoContext = createContext();

export default TodoContext;

// reducer.js
export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

// TodoApp.jsx
import { useReducer } from 'react';
import TodoContext from './TodoContext';
import { reducer, initialState } from './reducer';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <div>
        <h2>Todo App with Context and Reducer</h2>
        <TodoForm />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
};

export default TodoApp;

// TodoForm.jsx
import { useState, useContext } from 'react';
import TodoContext from './TodoContext';

const TodoForm = () => {
  const [text, setText] = useState('');
  const { dispatch } = useContext(TodoContext);

  const handleAdd = () => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      dispatch({ type: 'add', payload: newTodo });
      setText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoForm;

// TodoList.jsx
import { useContext } from 'react';
import TodoContext from './TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { state } = useContext(TodoContext);

  return (
    <ul>
      {state.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

// TodoItem.jsx
import { useContext } from 'react';
import TodoContext from './TodoContext';

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
        onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
      >
        {todo.text}
      </span>
      <button onClick={() => dispatch({ type: 'delete', payload: todo.id })}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;

// App.jsx
import TodoApp from './TodoApp';

const App = () => {
  return (
    <div>
      <TodoApp />
    </div>
  );
};

export default App;
