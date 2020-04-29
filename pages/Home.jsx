export default class Home extends React.Component {

    componentDidMount() {
        // document.body.style.backgroundImage = "url('assets/imgs/925.jpg')";
    }

    render() {
        return (
            <section className="home">
                <img src="assets/imgs/knight.png" alt="" className="home-horse"/>
            </section>
        )
    }
}
