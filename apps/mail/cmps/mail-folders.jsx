const { Link } = ReactRouterDOM
const { useState, useEffect } = React


export function MailFolders({onSetFilter}) {
    const [activeFolder, setActiveFolder] = useState('inbox')

    function onChangeFolder() {
        
    }

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