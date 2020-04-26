
import EmailPreview from './EmailPreview.jsx'


export default function EmailList(props) {
    const { mails } = props
    return (
        <section className="preview">
            {mails.map(mail => <EmailPreview subject={mail.subject} body={mail.body} isRead={mail.isRead} sentAt={mail.sentAt} key={mail.id} id={mail.id} />)}
        </section>
    )

}