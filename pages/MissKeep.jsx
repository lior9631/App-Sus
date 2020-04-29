const { Route, Switch } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import NotesView from '../apps/MissKeep/pages/NotesView.jsx'
import EditNote from '../apps/MissKeep/pages/EditNote.jsx'
import { eventBus } from '../services/eventBusService.js'


export default class MissKeep extends React.Component {

    state = {
        subject: null,
        body: null
    }

    componentDidMount() {
<<<<<<< HEAD
        // document.body.style.backgroundImage = "url(assets/img/notes-Background.jpg)";
        document.body.style.backgroundImage = "url(assets/imgs/925.jpg)";
        const str = this.props.location.search;

        if (str.length) {
            const subject = this.getSubject(str)
            const body = this.getBody(str)
            const SubAndbody = { subject, body }
            eventBus.emit('add-note', SubAndbody)

        }


=======
        document.body.style.backgroundImage = "url(assets/img/notes-Background.jpg)";


        const str = this.props.location.search;
        const subject = this.getSubject(str)
        const body = this.getBody(str)
        // if (str) {
        //     console.log('subject', subject)
        //     console.log('body', body)
        //     const note={
                
        //     }

        // }
>>>>>>> 935647fbf8c0821d066b2e8c3ce17984a7fd532f
    }

    getSubject = (str) => {
        const firstIdx = str.indexOf('=')
        const lastIdx = str.indexOf('&')
        return str.substring(firstIdx + 1, lastIdx)


    }

    getBody = (str) => {
        const firstIdx = str.indexOf('body') + 5
        const replacedStr = decodeURI(str);
        return replacedStr.substring(firstIdx)

    }

    render() {
        return (
            <section>
                <header>
                    <h1 className="misKeep-title"><img src="assets/img/Paper-notes.svg" alt="notes" />Miss Keep</h1>
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
