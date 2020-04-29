const { Route, Switch } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import NotesView from '../apps/MissKeep/pages/NotesView.jsx'
import EditNote from '../apps/MissKeep/pages/EditNote.jsx'


export default class MissKeep extends React.Component {

    componentDidMount() {
        document.body.style.backgroundImage = "url(../assets/img/notes-Background.jpg)";
    }

    render() {
        return (
            <section>
                <header>
                    <h1 className="misKeep-title"><img src="../assets/img/Paper-notes.svg" alt="notes" />Miss Keep</h1>
                </header>
                <main>

                    <section>
                        <NotesView />
                    </section>
                </main>
            </section>
        )
    }
}
