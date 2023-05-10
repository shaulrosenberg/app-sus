const { Fragment, useState } = React
const { Link } = ReactRouterDOM
const PREVIEW_LENGTH = 50

import { LongTxt } from "../../../cmps/long-txt.jsx"

export function DataTableRow({ mail }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const from = mail.from.split('@')[0]
    const sentAt = new Date(mail.sentAt).toLocaleString()

    return <Fragment>
        <tr className="list-item" onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
            <td>{from}</td>
            <td><LongTxt txt={mail.body} length={PREVIEW_LENGTH}/></td>
            <td>{sentAt}</td>
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
