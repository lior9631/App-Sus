


export default function InfoFormElement(props) {

    const { type, state, handleChange } = props
    switch (type) {
        case 'NoteText':
            return (
                <React.Fragment>
                    <textarea type="text" name="txt" value={state.info.txt} onChange={handleChange} placeholder="Write your note..." ></textarea>
                </React.Fragment >
            )
        case 'NoteImg':
        case 'NoteVideo':
            return (
                <React.Fragment>
                    <input type="text" name="url" value={state.info.url} onChange={handleChange} placeholder="Enter url" />
                </React.Fragment>
            )
        case 'NoteTodos':
            return (
                <React.Fragment>
                    <input type="text" name="txt" value={state.info.txt} onChange={handleChange} placeholder="Item list" />
                </React.Fragment>
            )
    }
}

