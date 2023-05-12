const { Fragment, useState } = React
const { Link, useNavigate } = ReactRouterDOM
const PREVIEW_LENGTH = 50

import { LongTxt } from "../../../cmps/long-txt.jsx"

// expand -> Link to mail/:mailId, if params.id -> hide mail list and show mail instead
// TODO: pass down onDelete and onChangeField
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
        setIsExpanded(prevIsExpanded => !prevIsExpanded)
        setIsRead(true)
        onToggleAttr(mail.id, 'isRead', true)
    }

    function onStarred(ev) { 
        ev.stopPropagation()
        onToggleAttr(mail.id, 'isStarred', !isStarred)
        setIsStarred(prevIsStarred => !prevIsStarred)
    }

    let from = mail.from.split('@')[0]
    if (from.charAt(0) === '<') from = from.substring(1)
    const sentAt = new Date(mail.sentAt).toLocaleString()

    // color classes
    let starClass = isStarred ? 'yellow' : 'gray'
    let rowClass = isRead ? '' : 'unread'

    return <Fragment>
        <tr className={`mail-preview ${rowClass}`} onMouseEnter={showControls} onMouseLeave={hideControls} onClick={onClickPreview}>
            <td className={`mail-star ${starClass}`} onClick={onStarred}>★</td>
            <td className="sender">{from}</td>
            <td className="subject"><span>{mail.subject}</span><span className="subject-seperator">-</span><LongTxt txt={mail.body} length={PREVIEW_LENGTH} /></td>
            <td className="timestamp">
                {!isShowControls && sentAt}
                {isShowControls &&
                    <div className="list-item-controls">
                        {/* maybe links and route to delete/:mailId */}
                        <button onClick={() => onDeleteMail(mail.id)} className="fa fa-trash"></button>
                        {/* add 2 way binding for read/unread */}
                        <button className="fa fa-envelope-close"></button>
                        <button className="fa fa-archive"></button>
                        <button onClick={() => navigate(`/mail/${mail.id}`)} className="fa fa-expand"></button>
                    </div>}
            </td>
        </tr>
        {
            isExpanded && <tr className="expanded-list-item">
                <td colSpan="3">
                    <p>{mail.body}</p>
                </td>
            </tr>
        }
    </Fragment >

}
