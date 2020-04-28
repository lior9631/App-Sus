import { eventBus } from '../../../services/eventBusService.js'

export default function EmailStatus(props) {

    function showStatus() {
        // var mails = this.props.mails;
        const readingMails = props.mails.filter(mail => !mail.isDelete && mail.isRead)

        if(props.mails.length != 0){
        // const readingMails = mails.filter(mail => mail.isRead === true)
        var precent = parseInt((readingMails.length / props.mails.length) * 100);
        }else precent = 0

        

        return precent
    }


    const pStyle = {
        width: `${showStatus()}%`
    }
    return (
        <section className="status-bar">
            <div className="full-width" className="grey-status"></div>
            <div style={pStyle} className="color-status"></div>
            <div className="the-nubmer">{showStatus()}%</div>
        </section>
    )
}


