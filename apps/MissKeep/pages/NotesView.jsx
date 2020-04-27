import KeepService from '../keepServices/keepService.js'

import Search from '../cmps/Search.jsx'
import AddNote from '../cmps/AddNote.jsx'
import NotesList from '../cmps/NotesList.jsx'

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
                console.log('getNote:', notes)
                this.setState({ notes });
            })
            .catch(err => {
                console.log('MissKeep got error:', err);
            })
    }

    render() {
        const { notes } = this.state

        return (
            <section>
                <header>
                    <Search getNotes={this.getNotes} />
                </header>
                <main>
                    <AddNote getNotes={this.getNotes} />
                    <section>
                        {notes &&
                            <NotesList notes={notes} getNotes={this.getNotes}/>}
                    </section>
                </main>
            </section>
        )
    }
}
