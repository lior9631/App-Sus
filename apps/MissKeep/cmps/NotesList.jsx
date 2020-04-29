import Note from './Note.jsx'
import ServiceStorage from '../keepServices/keepService.js'


export default class NotesList extends React.Component {
    state = {
        pinNotes: null,
        unPinNotes: null
    }
    render() {
        const { notes, getNotes } = this.props
        const { pinNotes } = this.state
        return (
            <React.Fragment>
                <article className="note-list">
                    {notes.filter(note => note.isPinned).map(note => <Note key={note.id} note={note} getNotes={getNotes} />)}
                </article>
                <article className="note-list">
                    {notes.filter(note => !note.isPinned).map(note => <Note key={note.id} note={note} getNotes={getNotes} />)}
                </article>
            </React.Fragment>
        )
    }
}
