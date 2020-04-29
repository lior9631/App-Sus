const { Route, Switch } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import NotesView from '../apps/MissKeep/pages/NotesView.jsx'
import EditNote from '../apps/MissKeep/pages/EditNote.jsx'


export default class MissKeep extends React.Component {

    render() {
        return (
            <section>
                
                <header>
                    <h1>MissKeep</h1>
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
