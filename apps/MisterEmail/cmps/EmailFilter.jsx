export default class EmailFilter extends React.Component {
    state = {
        filter: {
            words: '',
            isRead: '',
            notRead: ''

        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'checkbox') ? target.checked : target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
            


        })
    }
    toggleClass = (ev) =>{
        const {target} = ev
        target.classList.toggle("pushed")

    }

    render() {
        const { isRead, words, notRead } = this.state.filter
        return (
            <div className="filter-container">
                <form className="filter-form">
                    <input className="search-input" autoComplete="off" placeholder="&#xF002; Search" type="text" name='words' value={words} onChange={this.handleChange}  />
                    <label onClick={this.toggleClass} className="isRead" htmlFor="isRead">Read</label>
                    <input  id="isRead" type="checkbox" name='isRead' value={isRead} onChange={this.handleChange} />
                    <label onClick={this.toggleClass} className="notRead" htmlFor="notRead">Unread</label>
                    <input id="notRead" type="checkbox" name='notRead' value={notRead} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}