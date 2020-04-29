


export default function InfoFormElement(props) {

    const { type, note, handleChange, addTodo } = props
    switch (type) {
        case 'NoteText':
            return (
                <React.Fragment>
                    <textarea type="text" name="txt" value={note.info.txt} onChange={handleChange} placeholder="Write your note..." ></textarea>
                </React.Fragment >
            )
        case 'NoteImg':
        case 'NoteVideo':
            return (
                <React.Fragment>
                    <input type="text" name="url" value={note.info.url} onChange={handleChange} placeholder="Enter url" />
                </React.Fragment>
            )
        case 'NoteTodos':
            return (
                <React.Fragment>
                    <button nameClass="btn-add-todo" onClick={addTodo}>+Add todo</button>
                </React.Fragment>
            )
    }
    return 'Error'
}

