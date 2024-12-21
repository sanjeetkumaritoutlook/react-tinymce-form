import React, { useEffect } from "react";
import {v4 as uuidv4} from "uuid";

import { Todo ,CrudFormProps} from './types'; // Assuming you have a types file where Todo is defined


const CrudForm: React.FC<CrudFormProps> = ({input, setInput, todos, setTodos, editTodo, setEditTodo}) => {
    const updateTodo = (title: string, id: number, completed: boolean) => {
        const newTodo = todos.map((todo: Todo) => (todo.id === id) ? {title, id, completed} : todo )
        setTodos(newTodo);
        setEditTodo(null);
    }
    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("")
        }
    }, [setInput, editTodo])
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }
    interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {}

    const onFormSubmit = (event: FormSubmitEvent) => {
        event.preventDefault();
        if(!editTodo) {
            setTodos([...todos, {id: uuidv4(), title: input, completed: false}]);
            setInput("");
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    }
    return (
        <form onSubmit={onFormSubmit}>
            <input name="Todo" type="text" placeholder="Enter a Todo..." className="task-input"
            required
            value={input}
            onChange={onInputChange} />
            <button className="button-add" type="submit">
                {editTodo ? "OK" : "ADD"}
            </button>
        </form>
    )
}

export default CrudForm;