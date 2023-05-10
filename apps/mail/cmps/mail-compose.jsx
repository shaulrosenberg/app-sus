const {NavLink} = ReactRouterDOM


export function MailCompose() {
    return (
        <NavLink className="compose-link" to="/mail/edit">Compose</NavLink> 
    )
}