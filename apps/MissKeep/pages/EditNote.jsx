import keepService from '../keepServices/keepService.js'
const history = History.createBrowserHistory()


const { Link } = ReactRouterDOM

import AddNote from '../cmps/AddNote.jsx'


export default class EditNote extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        const idNote = this.props.match.params.idNote
        keepService.getNoteById(idNote)
            .then(note => {
                this.setState({ note })
            })
            .catch(ex => {
                console.log('EditNote got error:', ex);
                this.props.history.push('/keep')
            })
    }

    render() {

        return (
            <React.Fragment>
                {<Link className="link-edit-note" to={"/keep"}></Link>}
                <section className="edit-note" >
                    <div className="editNote-container">
                        {this.state.note && <AddNote getNotes={this.getNotes} note={this.state.note} isEditNote={true} />}
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
