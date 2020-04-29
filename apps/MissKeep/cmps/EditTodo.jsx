

export default function ItemsList(props) {
    const { idx, handleChange, state, deleteTodo } = props

    return (
        <li>
            <input type="text" name={idx} onChange={handleChange} value={state.note.info.todos[idx].txt} />
            <button type="button" onClick={() => { deleteTodo(idx) }}>x</button>
        </li>
    )
}
