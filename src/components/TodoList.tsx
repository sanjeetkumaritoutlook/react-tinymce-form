import React from "react";

import { Todo,TodoListProps } from './types'; // Assuming you have a types file where Todo is defined


const TodoList: React.FC<TodoListProps> = ({todos, setTodos, setEditTodo}) => {
    const handleCompleted = (todo: Todo): void => {
        setTodos(
            todos.map((item: Todo) => {
                if(item.id === todo.id) {
                    return {...item, completed: !item.completed}
                }
                return item;
            })
        )
    }

    const handleEdit = ({id}: {id: number}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        if (findTodo) {
            setEditTodo(findTodo);
        } else {
            setEditTodo(null);
        }
    }

    const handleDelete = ({id}: {id: number}) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <div>
            {todos.map((todo) => (
                <li className="list-item" key={todo.id}>
                    <input name="Todo" type="text" value={todo.title} 
                    className={`list ${todo.completed ?  "complete" : ""}`} 
                    onChange={(e) =>  e.preventDefault()} />
                    <div>
                        <button className="button-completed task-button" onClick={() => handleCompleted(todo)}> &#x2611; </button>
                    </div>
                    <div>
                        <button className={`button-edit task-button ${todo.completed ?  "disabled" : ""}`} onClick={() => handleEdit(todo)}> &#9998; </button>
                    </div>
                    <div>
                        <button className="button-delete task-button" onClick={() => handleDelete(todo)}> 🗑 </button>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default TodoList;