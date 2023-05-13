const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {

    const [isShowMenu, setIsShowMenu] = useState(false)

    return <header className="app-header">
        <Link to="/">
            <img className="app-logo" src="../assets/img/horselogo.jpg" />
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/book">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
