const { Link } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFolders({ onSetFilter, filterBy, countMailMap }) {
    const [activeFolder, setActiveFolder] = useState('inbox')
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function onChangeFolder(folderName) {
        const newFilter = { ...filterByToEdit }
        newFilter.status = folderName
        setActiveFolder(folderName)
        setFilterByToEdit(newFilter)
        onSetFilter(newFilter)
    }

    return (
        <ul className="mail-folders">
            <li onClick={() => onChangeFolder('inbox')} className={`folder-item ${activeFolder === 'inbox' ? 'active' : ''}`}>
                <span className="folder-icon"></span>
                <span className="folder-name">Inbox</span>
                <span className="folder-count">{ countMailMap['inbox'] }</span>
            </li>
            <li onClick={() => onChangeFolder('starred')} className={`folder-item ${activeFolder === 'starred' ? 'active' : ''}`}>
                <span className="folder-icon"></span>
                <span className="folder-name">Starred</span>
                <span className="folder-count">{ countMailMap['starred'] }</span>
            </li>
            <li onClick={() => onChangeFolder('sent')} className={`folder-item ${activeFolder === 'sent' ? 'active' : ''}`}>
                <span className="folder-icon"></span>
                <span className="folder-name">Sent</span>
                <span className="folder-count">{ countMailMap['sent'] }</span>
            </li>
            <li onClick={() => onChangeFolder('drafts')} className={`folder-item ${activeFolder === 'drafts' ? 'active' : ''}`}>
                <span className="folder-icon"></span>
                <span className="folder-name">Drafts</span>
                <span className="folder-count">{ countMailMap['drafts'] }</span>
            </li>
            <li onClick={() => onChangeFolder('trash')} className={`folder-item ${activeFolder === 'trash' ? 'active' : ''}`}>
                <span className="folder-icon"></span>
                <span className="folder-name">Trash</span>
                <span className="folder-count">{ countMailMap['trash'] }</span>
            </li>
        </ul>
    )
}