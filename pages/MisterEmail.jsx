import mailServices from '../apps/MisterEmail/mailServices/mailService.js'
import EmailList from '../apps/MisterEmail/cmps/EmailList.jsx'
import EmailStatus from '../apps/MisterEmail/cmps/EmailStatus.jsx'
import EmailFilter from '../apps/MisterEmail/cmps/EmailFilter.jsx'
import EmailCompose from '../apps/MisterEmail/cmps/EmailCompose.jsx'

export default class MisterEmail extends React.Component {

    state = {
        mails: null,
        filterBy : null
    }
    componentDidMount() {
        this.getEmails()
    }
    getEmails = () => {
        mailServices.query(this.state.filterBy)
            .then(data => {
                this.setState({ mails: data })
                console.log('data', this.state.mails)

            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.getEmails())
    }

    render() {
        const { mails } = this.state
        return (
            <section>
                <h1>bookList</h1>
                <EmailCompose />
                <EmailFilter onSetFilter={ this.onSetFilter }/>
                {mails && <EmailList mails={mails} />}
                {mails && <EmailStatus mails={mails} />}
            </section>
        )
    }
}
