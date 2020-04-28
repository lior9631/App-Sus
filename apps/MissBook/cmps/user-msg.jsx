import { eventBus } from '../../../services/eventBusService.js'

const { Link } = ReactRouterDOM


export default class UserMsg extends React.Component {
    timeout
    state = {
        msg: {
            txt: null,
            isMsgSuccess: null,
            bookLink: null
        }
    }

    componentDidMount() {
        eventBus.on('userMsg', (msg) => {
            this.setState({ msg })
            this.timeout = setTimeout(() => {
                this.initMsg()
            }, 5000)
        })
    }

    onBtn = () => {
        this.initMsg()
        clearTimeout(this.timeout)
        this.timeout = null
    }

    initMsg = () => {
        this.setState({
            msg: { txt: null, isMsgSuccess: null, bookLink: null }
        })
    }

    render() {
        const { txt, isMsgSuccess, bookLink } = this.state.msg

        const color = isMsgSuccess ? 'green' : 'darkred'
        const cmpStyle = {
            border: `3px solid ${color}`
        }
        const btnStyle = {
            border: `2px solid ${color}`,
            backgroundColor: color
        }

        return (!txt) ? '' :
            <aside className="userMsg" style={cmpStyle}>
                <button style={btnStyle} onClick={this.onBtn}>X</button>
                <p> {txt} </p>
                {bookLink && <Link to={bookLink}>To your book click here!</Link>}
            </aside>
    }
}
