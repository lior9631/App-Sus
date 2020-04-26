const { NavLink } = ReactRouterDOM


export default class NavBar extends React.Component {


    render() {

        return (
            <nav>
                <ul>
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
