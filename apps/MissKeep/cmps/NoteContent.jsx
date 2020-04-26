export default function NoteContent(props) {
    console.log('props', props);

    const { type, info } = props
    switch (type) {
        case 'NoteText':
            return <p>{info.txt}</p>
        case 'NoteImg':
            return (
                <React.Fragment>
                    <img src={info.url} />
                    <p>{info.title}</p>
                </React.Fragment>
            )
        case 'NoteTodos':
            return (
                <React.Fragment>
                    <p>{info.label}</p>
                    <ul>
                        {info.todos.map((todo, idx) => <li key={idx}> {todo.txt} {todo.doneAt}</li>)}
                    </ul>
                </React.Fragment>
            )
    }
    return <p>Error</p>
}
