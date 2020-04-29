const { NavLink } = ReactRouterDOM



export default function MissBookNavBar() {
    return (
        <nav className="books-nav-bar">
            <ul>
                <li>
                    <NavLink className='link' exact to='/books'>Books</NavLink>
                </li>
                <li>
                    <NavLink className='link' exact to='/addBook'>Add book</NavLink>
                </li>
            </ul>
        </nav>
    )
}
