export default class EmailStatus extends React.Component {

    state = {
        mails: null,
        precent: null
    }


    componentDidMount() {

        this.setState({ mails: this.props.mails }, this.showStatus)

    }

    showStatus = () => {
        var mails = this.state.mails;
        const readingMails = mails.filter(mail => mail.isRead === true)
        var precent = (readingMails.length / mails.length) * 100;

        this.setState({ precent }, () => { console.log(this.state.precent) })



    }


    render() {
        const { precent } = this.state
        const pStyle = {
            width: `${this.state.precent}%`
        }
        return (

            <section className="status-bar">
                <div className="full-width" className="grey-status"></div>
                <div style={pStyle} className="color-status"></div>
                <div className="the-nubmer">{precent}%</div>
            </section>
        )
    }


}