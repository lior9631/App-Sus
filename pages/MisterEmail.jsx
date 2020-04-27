import mailServices from '../apps/MisterEmail/mailServices/mailService.js'
import EmailList from '../apps/MisterEmail/cmps/EmailList.jsx'
import EmailStatus from '../apps/MisterEmail/cmps/EmailStatus.jsx'
import EmailFilter from '../apps/MisterEmail/cmps/EmailFilter.jsx'
import EmailCompose from '../apps/MisterEmail/cmps/EmailCompose.jsx'

export default class MisterEmail extends React.Component {

    state = {
        mails: null,
        filterBy: null,
        onCompose: false,
        starsFilter: false
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

    toggleCompose = () => {
        this.setState(({ onCompose }) => ({ onCompose: !onCompose }))
    }

    setStar = (id) => {
        mailServices.setStar(id).then(this.getEmails())

    }
    filterStars = (ev) => {
        let filterBy = this.state.filterBy
        let trueFalse = (!this.state.starsFilter) ? true : false
        ev.target.classList.toggle('yellow')
        mailServices.filterByStar(trueFalse, filterBy)
            .then(data => {
                this.setState({ mails: data }, this.setState({ starsFilter: trueFalse }))
                return data
            })

    }

    setUnRead = (id) => {
        mailServices.setUnRead(id)
            .then(this.getEmails())
    }

    setRead = (id) => {
        mailServices.setRead(id)
            .then(this.getEmails())

    }

    removeMail = (id) => {

      
                mailServices.remove(id)
                    .then(this.getEmails())
           
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
                        <div onClick={(ev) => this.filterStars(ev)} className="far fa-star"> Stared</div>


                        {mails && <EmailStatus mails={mails} />}
                    </div>

                </section>
            </section>
        )
    }
}