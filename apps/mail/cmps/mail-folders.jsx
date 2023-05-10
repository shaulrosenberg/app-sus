const { Link } = ReactRouterDOM


export function MailFolders() {

    

    return (
        <ul className="mail-folders">
            <li className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Inbox</span>
            </li>
            <li className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Starred</span>
            </li>
            <li className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Sent</span>
            </li>
            <li className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Drafts</span>
            </li>
            <li className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Trash</span>
            </li>
        </ul>
    )
}