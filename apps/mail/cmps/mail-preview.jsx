const { Fragment, useState } = React
const { Link, useNavigate } = ReactRouterDOM
const PREVIEW_LENGTH = 50

import { LongTxt } from "../../../cmps/long-txt.jsx"

// Mail Preview
export function MailPreview({ mail, onDeleteMail, onToggleAttr }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isShowControls, setIsShowControls] = useState(false)
    const [isRead, setIsRead] = useState(mail.isRead)
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const navigate = useNavigate()

    function showControls() {
        setIsShowControls(true)
    }

    function hideControls() {
        setIsShowControls(false)
    }

    function onClickPreview() {
        setIsExpanded(prevIsExpanded => !prevIsExpanded);
        if (!isRead) {
            setIsRead(true);
            onToggleAttr(mail.id, 'isRead', true);
        }
    }

    function onRemoveMail(ev) {
        ev.stopPropagation()
        if (mail.status !== 'trash') {
            onToggleAttr(mail.id, 'status', 'trash')
            return
        }
        onDeleteMail(mail.id)
    }

    function onToggleRead(ev) {
        ev.stopPropagation()
        onToggleAttr(mail.id, 'isRead', !isRead)
        setIsRead(prevState => !prevState)
    }

    function onStarred(ev) {
        ev.stopPropagation()
        onToggleAttr(mail.id, 'isStarred', !isStarred)
        setIsStarred(prevIsStarred => !prevIsStarred)
    }

    function getSender() {
        if(mail.status === 'sent') return `to: ${mail.to.split('@')[0]}`

        let sender =  mail.from.split('@')[0]
        if (sender.charAt(0) === '<') sender = sender.substring(1)
        return sender
    }
    
    const sentAt = new Date(mail.sentAt).toLocaleString()

    // color classes
    let starClass = isStarred ? 'yellow' : 'gray'
    let rowClass = isRead ? '' : 'unread'

    return (
        <Fragment>
            <tr className={`mail-preview ${rowClass}`} onMouseEnter={showControls} onMouseLeave={hideControls} onClick={onClickPreview}>
                <td className={`mail-star ${starClass}`} onClick={onStarred}>★</td>
                <td className="sender">{getSender()}</td>
                <td className="subject"><span>{mail.subject}</span><span className="subject-separator">-</span><LongTxt txt={mail.body} length={PREVIEW_LENGTH} /></td>
                <td className="timestamp">
                    {!isShowControls && sentAt}
                    {isShowControls &&
                        <div className="list-item-controls">
                            <button onClick={onRemoveMail} className="fa fa-trash" title="Move to trash"></button>

                            <button onClick={onToggleRead} className={isRead ? "fa fa-envelope-close" : "fa fa-envelope-open"} title="Read/Unread"></button>
                            <button className="fa fa-archive" title="Archive"></button>
                            <button onClick={() => navigate(`/mail/${mail.id}`)} className="fa fa-expand" title="Open"></button>
                        </div>}
                </td>
            </tr>
            {
                isExpanded && <tr className="expanded-list-item">
                    <td colSpan="4">
                        <p>{mail.body}</p>
                    </td>
                </tr>
            }
        </Fragment >
    )
}
