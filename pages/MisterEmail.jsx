import mailServices from '../apps/MisterEmail/mailServices/mailService.js'
import EmailList from '../apps/MisterEmail/cmps/EmailList.jsx'
import EmailStatus from '../apps/MisterEmail/cmps/EmailStatus.jsx'
import EmailFilter from '../apps/MisterEmail/cmps/EmailFilter.jsx'
import EmailCompose from '../apps/MisterEmail/cmps/EmailCompose.jsx'

import { eventBus } from '../services/eventBusService.js'

export default class MisterEmail extends React.Component {

    state = {
        mails: null,
        filterBy: null,
        onCompose: false
    }
    componentDidMount() {
        this.getEmails()
        document.body.style.backgroundImage = "url('../assets/imgs/black_wall_free_texture_by_pshoudini_d5lkrgk.jpg')";
    }
    getEmails = () => {
        mailServices.query(this.state.filterBy)
            .then(data => {
                this.setState({ mails: data })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.getEmails())
    }

    toggleCompose = () => {
        this.setState(({ onCompose }) => ({ onCompose: !onCompose }))
    }

    setStar = (id) => {
        mailServices.setStar(id).then(this.getEmails())

    }
    

    setUnRead = (id) => {
        mailServices.setUnRead(id)
            .then(() => {
                this.getEmails()
                // eventBus.emit('changeBar', this.state.mails)
            })
    }

    setRead = (id) => {
        mailServices.setRead(id)
            .then(() => {
                this.getEmails();
                // eventBus.emit('changeBar', this.state.mails)
            })
    }

    removeMail = (id) => {
        mailServices.sendToTrash(id)
        .then(() =>{
            this.getEmails();
                // eventBus.emit('changeBar', this.state.mails)
        })
        



        // mailServices.remove(id)
        //     .then(this.getEmails())

    }
    filterStars = () => {
        mailServices.filterByStar()
            .then(mails => {
                this.setState({ mails})
            })

    }

    setInbox = () =>{
        mailServices.bringAllMails()
        .then(mails => this.setState({mails}))
    }

    filterTrash = () => {
        mailServices.filterByTrash()
            .then(mails => {
                this.setState({ mails})
            })
    }

    filterSent = () =>{
        mailServices.filterBySent()
        .then(mails => this.setState({mails}))
    }







    render() {
        const { mails, onCompose } = this.state
        return (
            <section className="mister-email">
                <EmailFilter onSetFilter={this.onSetFilter} />
                {onCompose && <EmailCompose onSendMail={this.getEmails} onCompose={this.toggleCompose} />}
                <section className="container">
                    {mails && <EmailList removeMail={this.removeMail} mails={mails} setStar={this.setStar} setUnRead={this.setUnRead} setRead={this.setRead} />}

                    <div className="side-nav">
                        <div className="add-mail">
                            <div onClick={this.toggleCompose} className="compose-icon"></div>
                            <p onClick={this.toggleCompose} className="compose-paragraph">Compose</p>
                        </div>
                        <div onClick={this.setInbox} className="fas fa-inbox nav-select"> Inbox</div>
                        <div onClick={this.filterStars} className="far fa-star"> Starred</div>
                        <div onClick={this.filterSent} className="fas fa-paper-plane nav-select"> Sent</div>
                        <div onClick={this.filterTrash} className="far fa-trash nav-select"> Trash</div>



                        {mails && <EmailStatus mails={mails} />}
                    </div>

                </section>
            </section>
        )
    }
}
