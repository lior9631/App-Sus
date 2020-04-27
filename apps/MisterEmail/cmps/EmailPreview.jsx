const { Link } = ReactRouterDOM

export default class EmailPreview extends React.Component {

    render() {
        const { subject, body, sentAt, isRead, isStar } = this.props
        
        return (

            <Link to={`/email/${this.props.id}`}>
                <div className={`preview-item ${isRead ? 'readed' : 'unread'}`} >
                    <h3> {subject}</h3>
                    <p className="body-preview"> {body}</p>
                    <p className="date">{sentAt}</p>
                    <div className={`far fa-star ${(isStar) ? 'yellow' : ''}`}
                        onClick={(e) => {
                           
                            
                            this.props.setStar(this.props.id);
                            e.stopPropagation();
                            e.preventDefault();
                            return false
                        }}></div>
                        <section className="envelope">
                            <div className={`far fa-envelope ${isRead ? 'hidden' : ''}`}  onClick={(e) =>{
                                e.preventDefault()
                                this.props.setRead(this.props.id)
                            }}></div>
                            <div className={`far fa-envelope-open ${!isRead ? 'hidden' : ''}`} onClick={(e) =>{
                                e.preventDefault()
                                this.props.setUnRead(this.props.id)
                            }}></div>
                        </section>
                        <div className="far fa-trash" onClick={(e) =>{
                                e.preventDefault()
                                this.props.removeMail(this.props.id)
                            }} ></div>
                        
                        
                </div>
            </Link>
        )
    }
}