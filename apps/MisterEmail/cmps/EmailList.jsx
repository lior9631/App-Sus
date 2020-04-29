
import EmailPreview from './EmailPreview.jsx'


export default function EmailList(props) {

    const { mails } = props
    return (
        <section className="mail-container">
            <div className="preview">
            {mails.map(mail => <EmailPreview removeMail={props.removeMail} setRead={props.setRead} setUnRead={props.setUnRead} setStar={props.setStar} {...mail} key={mail.id} />)}
            </div>
        </section>
    )

}