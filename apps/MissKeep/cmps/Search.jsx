



export default class Search extends React.Component {

    state = {
        filter: {
            input: '',
            type: 'all'
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value


        this.setState(prevState => ({
            filter: { ...prevState.filter, [field]: value }
        }), () => this.props.getNote(this.state.filter))

    }

    render() {

        const { input, type } = this.state.filter
        return (
            <form>
                <input type="text" name="input" value={input} onChange={this.handleChange} placeholder="Search note" />
                <select name="type" value={type} onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="NoteText">Text</option>
                    <option value="NoteTodos">List</option>
                    <option value="NoteImg">Image</option>
                </select>
            </form>
        )
    }
}
