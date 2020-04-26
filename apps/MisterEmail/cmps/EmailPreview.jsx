const { Link } = ReactRouterDOM

export default class EmailPreview extends React.Component {

    render() {
        const { subject, body, sentAt, isRead, id } = this.props
        return (

            <Link to={`/email/${this.props.id}`}>
                <div className={`preview-item ${isRead ? 'readed' : 'unread'}`} >
                    <h2> {subject}</h2>
                    <p> {body}</p>
                    <p className="date">{sentAt}</p>
                </div>
            </Link>
        )
    }
}