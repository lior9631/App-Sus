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
                this.resetForm()
                this.props.onSendMail()
                this.props.history.push('/email')

            })
            .catch(err => {
                console.log('OOPs', err);

            })
            this.props.onCompose()
    }

    resetForm = () => {
        this.setState(
            {
                subject: '',
                body: ''
            }
        ), console.log(this.state)
    }



    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState.filter, [field]: value }))
    }


    render() {
        return (


            <div className="compose">
                <div className="compose-header">New Message
                 <button className="close-button" onClick={this.props.onCompose}>X</button>
                </div>
                <form onSubmit={this.sendEmail}>
                    <input autoComplete="off" value={this.state.subject} className="compose-subject" type="text" name='subject' placeholder={'subject'} onChange={this.handleChange} />
                    <textarea autoComplete="off" value={this.state.body} className="compose-body" type="text" name='body' placeholder={'Enter your Message'} onChange={this.handleChange}> </textarea>
                    <button className="send-button" >SEND</button>
                </form>


            </div>




        )
    }
}