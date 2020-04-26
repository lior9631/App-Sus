import Note from './Note.jsx'

export default function NotesList(props) {
    const { notes } = props
    
    return (
        <section>
            {notes.map(note => <Note key={note.id} note={note} />)}
        </section>
    )
}
