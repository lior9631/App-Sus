const { Route, Switch } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import NotesView from '../apps/MissKeep/pages/NotesView.jsx'
import EditNote from '../apps/MissKeep/pages/EditNote.jsx'


export default class MissKeep extends React.Component {

    state = {
        subject: null,
        body: null
    }

    componentDidMount() {
        document.body.style.backgroundImage = "url(assets/img/notes-Background.jpg)";
        const str = this.props.location.search;
        const subject = this.getSubject(str)
        const body = this.getBody(str)
        console.log('subject' , subject)
        console.log('body', body)
        
    }

    getSubject = (str) => {
        const firstIdx = str.indexOf('=')
        const lastIdx = str.indexOf('&')
        return str.substring(firstIdx+1, lastIdx)


    }

    getBody = (str) =>{
        const firstIdx = str.indexOf('body')+5
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
