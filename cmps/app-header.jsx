const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {

    const [isShowMenu, setIsShowMenu] = useState(false)
    const navLinks = [
        {
            path: '/',
            logoSrc: '../assets/img/home.png',
            name: 'Home',
        },
        {
            path: '/about',
            logoSrc: '../assets/img/about.png',
            name: 'About',
        },
        {
            path: '/mail',
            logoSrc: '../assets/img/mail-icon.png',
            name: 'Mail',
        },
        {
            path: '/book',
            logoSrc: '../assets/img/book.png',
            name: 'Book',
        },
        {
            path: '/note',
            logoSrc: '/assets/img/note.png',
            name: 'Note',
        },
    ];


    function toggleMenu() {
        setIsShowMenu(!isShowMenu)
    }


    return (
        <header className="app-header">
            <Link to="/">
                <img className="app-logo" src="../assets/img/horselogo.jpg" alt="Logo" />
            </Link>
            <div className="menu-button" onClick={toggleMenu}>
                <img src="../assets/img/menu-icon.jpg" alt="Menu" />
            </div>
            <nav className={`menu-grid ${isShowMenu ? 'show' : ''}`}>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className="nav-link"
                    >
                        <div className="nav-link-logo">
                            <img src={link.logoSrc} alt={link.name} />
                        </div>
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </header>
    )

}
