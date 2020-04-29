import mailService from "../mailServices/mailService.js";

export default class EmailDetails extends React.Component {

    state = { mail: null }


    componentDidMount() {
        this.loadMail()

    }


    loadMail() {
        const id = this.props.match.params.theMailId
        mailService.getById(id)
            .then(mail => {
                this.setState({ mail }, this.putRead(id))
            })
    }
    putRead = (id) => {
        mailService.putRead(id)

    }

    removeMail = () => {
        mailService.remove(this.state.mail.id)
            .then(() => {
                this.props.history.push('/email')
            })
            .catch(err => {
                alert('OOPs, try again');
                console.log('ERR:', err);

            })

    }


    render() {
        const { mail } = this.state

        const Loading = <p>Loading...</p>
        return ((!mail) ? Loading : <section className="details">
            <h2>{mail.subject}</h2>
            <div className="mail-container">
                {mail.body}
            </div>
            <div className="container-footer">{mail.sentAt}</div>
            <div className="remove-mail" onClick={this.removeMail}>X</div>
        </section>

        )
    }
}