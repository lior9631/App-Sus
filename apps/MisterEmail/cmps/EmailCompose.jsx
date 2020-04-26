import mailService from "../mailServices/mailService.js"

export default class EmailCompose extends React.Component {

    state = {
        subject: '',
        body: ''
    }


    sendEmail = (ev) => {
        ev.preventDefault()
        mailService.save(this.state)
            .then(savedMail => {
                console.log('mail sent!', savedMail);
                this.props.history.push('/email')

            })
            .catch(err => {
                console.log('OOPs', err);

            })
    }



    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState.filter, [field]: value }))
        console.log('stateCVAL', this.state)
    }


    render() {
        return (


            <div className="compose">
                <form onSubmit={this.sendEmail}>
                    <input className="compose-subject" type="text" name='subject' placeholder={'enter a subject here'} onChange={this.handleChange} />
                    <input className="compose-body" type="text" name='body' placeholder={'Enter your Message'} onChange={this.handleChange} />
                    <button>SEND</button>
                </form>
            </div>




        )
    }
}