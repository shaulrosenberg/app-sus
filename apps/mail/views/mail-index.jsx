const { useState, useEffect, useRef } = React

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"


export function MailIndex() {

    const [mails, setMails] = useState(null)


    return (
        <div className="mail-index">
            {/* render folders */}
            {/* render mail list */}
            <MailFilter />
            <MailList />
        </div>
    )
}

