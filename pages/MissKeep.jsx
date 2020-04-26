import KeepService from '../apps/MissKeep/keepServices/keepService.js'

import Search from '../apps/MissKeep/cmps/Search.jsx'
import AddNote from '../apps/MissKeep/cmps/AddNote.jsx'
import NotesList from '../apps/MissKeep/cmps/NotesList.jsx'

export default class MissKeep extends React.Component {

    state = {
        notes: null
    }

    componentDidMount() {
        this.getNote()
    }

    getNote = (filter = null) => {
        KeepService.query(filter)
            .then(notes => {
                console.log('componentDidMount:', notes)
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
                    <Search getNote={this.getNote} />
                </header>
                <main>
                    {/* <AddNote /> */}
                    <section>
                        {notes &&
                            <NotesList notes={notes} />}
                    </section>
                </main>
            </section>
        )
    }
}
