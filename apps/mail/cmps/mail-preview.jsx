const { Fragment, useState } = React
const { Link, useNavigate } = ReactRouterDOM
const PREVIEW_LENGTH = 50

import { LongTxt } from "../../../cmps/long-txt.jsx"

// expand -> Link to mail/:mailId, if params.id -> hide mail list and show mail instead
// TODO: pass down onDelete and onChangeField
export function MailPreview({ mail, onDeleteMail }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isShowControls, setIsShowControls] = useState(false)
    const navigate = useNavigate()

    function showControls() {
        setIsShowControls(true)
    }

    function hideControls() {
        setIsShowControls(false)
    }

    function onClickPreview() {
        setIsExpanded(prevIsExpanded => !prevIsExpanded)
        
    }

    const from = mail.from.split('@')[0]
    const sentAt = new Date(mail.sentAt).toLocaleString()

    return <Fragment>
        <tr className="mail-preview" onMouseEnter={showControls} onMouseLeave={hideControls} onClick={onClickPreview}>
            <td className="sender">{from}</td>
            <td className="subject"><span>{mail.subject}</span><span className="subject-seperator">-</span><LongTxt txt={mail.body} length={PREVIEW_LENGTH} /></td>
            <td className="timestamp">
                {!isShowControls && sentAt}
                {isShowControls &&
                    <div className="list-item-controls">
                        {/* maybe links and route to delete/:mailId */}
                        <button onClick={() => onDeleteMail(mail.id)} className="fa fa-trash"></button>
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
