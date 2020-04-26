import mailServices from '../apps/MisterEmail/mailServices/mailService.js'
import EmailList from '../apps/MisterEmail/cmps/EmailList.jsx'
import EmailStatus from '../apps/MisterEmail/cmps/EmailStatus.jsx'

export default class MisterEmail extends React.Component {

    state = {
        mails: null
    }
    componentDidMount() {
        this.getEmails()
    }
    getEmails = () => {
        mailServices.getMails()
            .then(data => {
                this.setState({ mails: data })
                console.log('data', this.state.mails)

            })
    }

    render() {
        const { mails } = this.state
        return (
            <section>
                <h1>bookList</h1>
                {mails && <EmailList mails={mails} />}
                {mails && <EmailStatus mails={mails} />}
            </section>
        )
    }
}
