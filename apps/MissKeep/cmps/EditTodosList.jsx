import EditTodo from './EditTodo.jsx'

export default function EditTodosList(props) {
    const { todos, handleChange, state, deleteTodo } = props
    return (
        <div>
            {todos.map((todo, idx) => <EditTodo key={idx} todo={todo} idx={idx} handleChange={handleChange} state={state} deleteTodo={deleteTodo}/>)}
        </div>
    )
} 
