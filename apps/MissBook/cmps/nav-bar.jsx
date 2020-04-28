const { NavLink } = ReactRouterDOM



export function NavBar() {
    return (
        <nav className="nav-bar">
            <ul>
                <li>
                    <NavLink className='link' exact to='/'>Home</NavLink>
                </li>
                <li>
                    <NavLink className='link' exact to='/books'>Books</NavLink>
                </li>
                <li>
                    <NavLink className='link' exact to='/addBook'>Add book</NavLink>
                </li>
                <li>
                    <NavLink className='link' exact to='/about'>About</NavLink>
                </li>
            </ul>
        </nav>
    )
}
