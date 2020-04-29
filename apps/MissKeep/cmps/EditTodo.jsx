

export default function ItemsList(props) {
    const { idx, handleChange, state, deleteTodo } = props

    return (
        <li>
            <input type="text" name={idx} onChange={handleChange} value={state.note.info.todos[idx].txt} autoFocus />
            <button className="btn-del-todo" type="button" onClick={() => { deleteTodo(idx) }}>x</button>
        </li>
    )
}
