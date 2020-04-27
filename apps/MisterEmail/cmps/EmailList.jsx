
import EmailPreview from './EmailPreview.jsx'


export default function EmailList(props) {

    const { mails } = props
    return (
        <section className="mail-container">
            <div className="preview">
            {mails.map(mail => <EmailPreview removeMail={props.removeMail} setRead={props.setRead} setUnRead={props.setUnRead} setStar={props.setStar} {...mail} key={mail.id} />)}
            {/* {mails.map(mail => <EmailPreview setStar={props.setStar} isStar={mail.isStar} subject={mail.subject} body={mail.body} isRead={mail.isRead} sentAt={mail.sentAt} key={mail.id} id={mail.id} />)} */}
            </div>
        </section>
    )

}