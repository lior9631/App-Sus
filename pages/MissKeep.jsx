import KeepService from '../apps/MissKeep/keepServices/keepService.js'

import Filter from '../apps/MissKeep/cmps/Filter.jsx'
import AddNote from '../apps/MissKeep/cmps/AddNote.jsx'
import NotesList from '../apps/MissKeep/cmps/NotesList.jsx'

export default class MissKeep extends React.Component {

    state = {
        notes: null
    }

    componentDidMount() {
        KeepService.query()
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
                    <Filter />
                </header>
                <main>
                    <AddNote />
                    <section>
                        {notes &&
                            <NotesList notes={notes} />}
                    </section>
                </main>
            </section>
        )
    }
}
