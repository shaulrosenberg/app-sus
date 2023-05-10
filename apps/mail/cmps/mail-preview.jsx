const { Fragment, useState } = React
const { Link } = ReactRouterDOM
const PREVIEW_LENGTH = 50

import { LongTxt } from "../../../cmps/long-txt.jsx"

export function DataTableRow({ mail }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isShowControls, setIsShowControls] = useState(false)

    function showControls() {
        setIsShowControls(true)
    }

    function hideControls() {
        setIsShowControls(false)
    }

    const from = mail.from.split('@')[0]
    const sentAt = new Date(mail.sentAt).toLocaleString()

    return <Fragment>
        <tr className="list-item" onMouseEnter={showControls} onMouseLeave={hideControls} onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
            <td>{from}</td>
            <td><LongTxt txt={mail.body} length={PREVIEW_LENGTH} /></td>
            <td>
                {!isShowControls && sentAt}
                {isShowControls &&
                    <div className="list-item-controls">
                        {/* maybe links and route to delete/:mailId */}
                        <button className="fa fa-trash"></button>
                        <button className="fa fa-envelope-close"></button>
                        <button className="fa fa-archive"></button>
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
