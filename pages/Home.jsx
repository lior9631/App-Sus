export default class Home extends React.Component {

    componentDidMount() {
        document.body.style.backgroundImage = "url('../assets/imgs/jakob-puff-sE6xpbBqFHE-unsplash.jpg')";
    }

    render() {
        return (
            <section className="home">
                <h2>Home Sweet Home</h2>
            </section>
        )
    }
}
