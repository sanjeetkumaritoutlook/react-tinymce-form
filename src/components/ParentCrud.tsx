import React,{ useState,useEffect }  from 'react';
import './ParentCrud.css';
import CrudForm from './CrudForm';
import Header from './Header';
import TodoList from './TodoList';
import { Todo } from './types'; // Assuming you have a types file where Todo is defined

const ParentCrud = () => {
const initialState = JSON.parse(localStorage.getItem('todos') || '[]')
const [input, setInput] = useState("");
const [todos, setTodos] = useState(initialState);

const [editTodo, setEditTodo] = useState<Todo | null>(null);
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
})

return (
    <div className="container">
      <div className='app-wrapper'>
        <div>
          <Header />
        </div>
        <div>
          <CrudForm 
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
        </div>
        <div>
          <TodoList todos={todos} setTodos={setTodos}
            setEditTodo={setEditTodo}
           />
        </div>
      </div>
    </div>
);
};

export default ParentCrud;
