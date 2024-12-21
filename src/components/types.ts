export interface Todo {
    id: any;  // (to support both string | number;
    title: string;
    completed: boolean;
}
export interface TodoListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}
export interface CrudFormProps {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    editTodo: Todo | null;
    setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

export interface EditorProps {
    id: string;
    inline?: boolean;
    placeholder: string;
    height?: string;
    onChange: Function;
    key?: string;
    value?: string;
    onUploadClicked?: Function;
  }