import keepService from '../keepServices/keepService.js'

const { Link } = ReactRouterDOM

import AddNote from '../cmps/AddNote.jsx'


export default class EditNote extends React.Component {
    sate = {

    }

    componentDidMount() {
        const idNote = this.props.match.params.idNote
        keepService.getNoteById(idNote)
            .then(note => {
                console.log('note:', note);
                this.setState({ note: note }, () => {
                    console.log(this.sate);
                })
            })
            .catch(ex => {
                console.log(ex);
                this.props.history.push('/keep')
            })
    }

    render() {

        return (
            <React.Fragment>
                {/* <Link className="link-edit-note" to={"/keep"}></Link> */}
                <section className="edit-note" >
                    <div className="editNote-container">
                        {this.sate.note && <AddNote getNotes={this.getNotes} note={this.state.note} isEditNote={true} />}
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
