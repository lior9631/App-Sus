import {eventBus} from '../../../services/eventBusService.js'

export default class EmailStatus extends React.Component {

    state = {
        mails: null,
        precent: null
    }


    componentDidMount() {
        
       this.busbus = eventBus.on('changeBar' , (data)=> this.renderStatus(data))
        this.setState({ mails: this.props.mails }, this.showStatus)

    }

    componentWillUnMount(){
        this.busbus()
    }

    showStatus = () => {
        var mails = this.state.mails;
        const readingMails = mails.filter(mail => mail.isRead === true)
        var precent =parseInt((readingMails.length / mails.length) * 100) ;

        this.setState({ precent })



    }

    renderStatus = (data) =>{
        this.setState({mails: data}, this.showStatus())
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