import KeepService from '../keepServices/keepService.js'

import Search from '../cmps/Search.jsx'
import AddNote from '../cmps/AddNote.jsx'
import NotesList from '../cmps/NotesList.jsx'
import EditNote from './EditNote.jsx'


export default class NotesView extends React.Component {
    state = {
        notes: null
    }

    componentDidMount() {
        this.getNotes()

    }

    getNotes = (filter = null) => {
        KeepService.query(filter)
            .then(notes => {
                this.setState({ notes });
            })
            .catch(err => {
                console.log('MissKeep got error:', err);
            })
    }

    render() {
        const { notes } = this.state

        return (
            <React.Fragment>
                <section className="notes-view">
                        <Search getNotes={this.getNotes} />
                        <AddNote getNotes={this.getNotes} isEditNote={false} />
                        <section className="container-notes-list">
                            {notes &&
                                <NotesList notes={notes} getNotes={this.getNotes} />}
                        </section>
                </section>
            </React.Fragment>
        )
    }
}
