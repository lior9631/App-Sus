

export default function NoteTodos(props)
{
    const { info } = props

    return (
        <React.Fragment>
            <h2>{info.title}</h2>
            <p>{info.label}</p>
            <ul>
                {info.todos.map((todo, idx) => <li key={idx}> {todo.txt} {todo.doneAt}</li>)}
            </ul>
        </React.Fragment>
    )
}
