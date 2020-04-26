

export default class Filter extends React.Component {

    render() {
        return (
            <form>
                <input type="text" placeholder="Search note" />
                <select name="selectFilter">
                    <option value="all">All</option>
                </select>
            </form>
        )
    }
}
