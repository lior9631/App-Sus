import KeepService from '../keepServices/keepService.js'

import InfoFormElement from './InfoFormElement.jsx'
import Colors from './Colors.jsx'
import { eventBus } from '../../../services/eventBusService.js'

import EditTodosList from './EditTodosList.jsx'

const { Link } = ReactRouterDOM

const history = History.createBrowserHistory()


export default class AddNote extends React.Component {

    state = {
        isColorsShow: false,
        note: {
            type: 'NoteText',
            isPinned: false,
            info: {
                title: '',
                txt: '',
                video: null,
                todos: null
            },
            style: {
                backgroundColor: 'white'
            }
        }
    }


    componentDidMount() {
        if (this.props.isEditNote) {
            this.resetEditNote()
        }

        this.unSubscribe = eventBus.on('add-note', (data) => this.makeItNote(data))



    }

    componentWillUnmount() {
        this.unSubscribe()

    }

    makeItNote = (data) => {

        const note = {
            type: 'NoteText',
            isPinned: false,
            info: {
                title: data.subject,
                txt: data.body
            },
            style: {
                backgroundColor: 'white'
            }
        }

        this.addNoteFromQueryString(note)
    }
    resetEditNote = () => {
        this.setState({ note: this.props.note }, () => { console.log('state:', this.state) })
    }

    changeType = (type) => {
        this.clearForm()
        this.setState(prevState => ({
            note: { ...prevState.note, type }
        }), () => {
            if (this.state.note.type === 'NoteTodos') {
                this.createTodos()
            }
        })
    }

    addNote = (ev) => {
        ev.preventDefault()
        console.log(this.state.note);
        KeepService.addNote(this.state.note)
        this.clearForm()
        this.props.getNotes()
    }

    addNoteFromQueryString = (data) => {
        console.log(data);
        KeepService.addNote(data)
        this.props.getNotes()

    }


    editedNote = () => {
        const note = this.state.note
        KeepService.deleteNote(note.id)
        KeepService.addNote(note)
        this.props.history.push('/keep')
    }

    clearForm = () => {
        const note = {
            type: 'NoteText',
            isPinned: false,
            info: {
                title: '',
                txt: '',
                url: ''
            },
            style: {
                backgroundColor: 'white'
            }
        }
        this.setState({ note })
    }

    handleChange = ({ target }) => {
        const field = target.name
        var value = target.value

        console.log('onChange:', value)
        if (this.state.note.type === 'NoteTodos') {
            var todos = this.state.note.info.todos
            todos[+field].txt = value
            value = todos
        }
        this.setState(prevState => ({
            note: { ...prevState.note, info: { ...prevState.note.info, [field]: value } }
        }))
    }


    pinNote = () => {

        const isPinned = !this.state.note.isPinned
        this.setState(prevState => ({
            note: { ...prevState.note, isPinned }
        }))
    }

    changeColor = (color) => {
        this.setState(prevState => ({
            note: { ...prevState.note, style: { ...prevState.note.style, backgroundColor: color } }
        }))
    }

    onColorPlate = () => {
        this.setState(({ isColorsShow }) => ({ isColorsShow: !isColorsShow }))
    }

    addTodo = () => {
        console.log('addTodo: working');
        var todos = this.state.note.info.todos
        todos.push(
            {
                txt: '',
                doneAt: null
            }
        )
        this.setState(this.state.note)
    }

    createTodos = () => {
        this.setState(prevState => ({
            note: { ...prevState.note, info: { ...prevState.note.info, todos: [] } }
        }))
    }

    deleteTodo = (idx) => {
        var todos = this.state.note.info.todos
        todos.splice(idx, 1)
        this.setState(prevState => ({
            note: { ...prevState.note, info: { ...prevState.note.info, todos } }
        }))
    }

    render() {
        const { type, info, isPinned, style } = this.state.note
        const { note, isColorsShow } = this.state
        const { isEditNote } = this.props

        const pinStyle = {
            backgroundColor: isPinned ? '#ffd15c ' : 'white'
        }

        return (
            <section className="add-note" style={style} >
                <form onSubmit={isEditNote ? this.editedNote : this.addNote}>
                    <section className="add-note-top">
                        <div>
                            <button className="btn-pin-note-add" onClick={this.pinNote} type="button" style={pinStyle}></button>
                            <input type="text" name="title" value={info.title} onChange={this.handleChange} placeholder="Write title..." />
                        </div>
                        {type === 'NoteTodos' && ('todos' in info) && <EditTodosList todos={info.todos} handleChange={this.handleChange} state={this.state} deleteTodo={this.deleteTodo} />}
                        <InfoFormElement type={type} note={note} addTodo={this.addTodo} handleChange={this.handleChange} />
                    </section>
                    <section className="add-note-bottom">
                        <div className="panel-btns">
                            <div className="box-btns">
                                <div className="types">
                                    <button className="btn-text" type="button" onClick={() => { this.changeType('NoteText') }}></button>
                                    <button className="btn-img" type="button" onClick={() => { this.changeType('NoteImg') }}></button>
                                    <button className="btn-list" type="button" onClick={() => { this.changeType('NoteTodos') }}></button>
                                    <button className="btn-video" type="button" onClick={() => { this.changeType('NoteVideo') }}></button>
                                </div>
                                <div className="colors">
                                    {isColorsShow && <Colors changeColor={this.changeColor} onColorPlate={this.onColorPlate} addTodo={this.addTodo} />}
                                    <button className="btn-note-background" type="button" onClick={this.onColorPlate}></button>
                                </div>
                            </div>
                            <div className="actions-btn">
                                {isEditNote ?
                                    <button className="btn-clear" type="button" onClick={this.resetEditNote}><img src="assets/img/reset.png" />Reset</button> :
                                    <button className="btn-clear" type="button" onClick={this.clearForm}><img src="assets/img/clear.png" />Clear</button>
                                }
                                <button className="btn-submit" type="submit" ><img src="assets/img/ok.png" />OK</button>
                            </div>
                        </div>
                        {isEditNote && <Link className="btn-cancel" type="button" to={'/keep'}><img src="assets/img/clear.png" />Cancel</Link>}
                    </section>
                </form>
            </section>
        )

    }
}
