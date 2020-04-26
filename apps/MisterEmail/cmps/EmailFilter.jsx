export default class EmailFilter extends React.Component {
    state = {
        filter: {
            words: '',
            isRead: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'checkbox') ? target.checked : target.value
        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)


        })
    }

    clearFilter = ()=>{
        this.props.onSetFilter({filter: {
            words: '',
            isRead: ''
        }})

    }
    render() {
        const { isRead, words } = this.state.filter
        return (
            <React.Fragment>
                <h1>Filter:</h1>
                <form>
                    <label htmlFor="words">By words</label>
                    <input type="text" name='words' value={words} onChange={this.handleChange} />
                    <label htmlFor="isRead">readed messages</label>
                    <input type="checkbox" name='isRead' value={isRead} onChange={this.handleChange} />
                    <div className="clear-filter" onClick={this.clearFilter}>CLEAR</div>
                </form>
            </React.Fragment>
        )
    }
}