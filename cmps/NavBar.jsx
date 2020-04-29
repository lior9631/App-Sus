const { NavLink } = ReactRouterDOM


export default class NavBar extends React.Component {


    render() {

        return (
            <nav className="app-nav">
                <ul>
                    <li><img src="../assets/imgs/horseshoe.png" alt="" className="header-logo"/></li>
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink exact to="/email">Mister Email</NavLink></li>
                    <li><NavLink exact to="/keep">Miss Keep</NavLink></li>
                    <li><NavLink exact to="/books">Miss Book</NavLink></li>
                </ul>
                {/* <button onClick={() => {
                    console.log('PROPS', props);

                    props.history.goBack();
                }}>Back</button> */}
            </nav>
        )
    }
}
