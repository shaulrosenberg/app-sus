const { Link } = ReactRouterDOM
const { useState, useEffect } = React


export function MailFolders({ onSetFilter, filterBy }) {
    const [activeFolder, setActiveFolder] = useState('inbox')
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function onChangeFolder({ target }) {
        const value = target.dataset['folder']
        console.log(value)
        const newFilter = { ...filterByToEdit }
        newFilter.status = value
        setActiveFolder(value)
        setFilterByToEdit(newFilter)
        onSetFilter(newFilter)
    }

    return (
        <ul className="mail-folders">
            <li data-folder="inbox" onClick={onChangeFolder} className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Inbox</span>
            </li>
            <li data-folder="starred" onClick={onChangeFolder} className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Starred</span>
            </li>
            <li data-folder="sent" onClick={onChangeFolder} className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Sent</span>
            </li>
            <li data-folder="drafts" onClick={onChangeFolder} className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Drafts</span>
            </li>
            <li data-folder="trash" onClick={onChangeFolder} className="folder-item">
                <span className="folder-icon"></span>
                <span className="folder-name">Trash</span>
            </li>
        </ul>
    )
}