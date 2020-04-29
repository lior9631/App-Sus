import NoteContent from './NoteContent.jsx'
import ServiceStorage from '../keepServices/keepService.js'

const { Link } = ReactRouterDOM

export default class Note extends React.Component {

    onPin = (idNote) => {
        ServiceStorage.pinNote(idNote)
        this.props.getNotes()
    }

    deleteNote = (idNote) => {
        ServiceStorage.deleteNote(idNote)
        this.props.getNotes()
    }

    render() {
        const { id, type, isPinned, info, style } = this.props.note
        const isPinStyle = {
            backgroundColor: isPinned ? '#ffd15c ' : 'white'
        }
        return (
            <article style={style} className="note">
                <button className="btn-note btn-pin-note" style={isPinStyle} onClick={() => { this.onPin(id) }}></button>
                <button className="btn-note btn-del-note" onClick={() => { this.deleteNote(id) }}></button>
                <Link className="btn-note note-edit-link" to={"/keep/" + id}></Link >
                <NoteContent type={type} info={info} key={id} />

            </article>
        )
    }
} 
