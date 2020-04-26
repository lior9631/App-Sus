

export default class AddNote extends React.Component {


    render() {
        return (
            <section>
                <input type="text" placeholder="Write your note..." />
                <button>A</button>
                <button>Img</button>
                <button>Video</button>
                <button>Voice</button>
                <button>List</button>
            </section>
        )
    }
}
