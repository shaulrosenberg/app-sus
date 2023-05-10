const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"

// smart component will query emails, and pass them down to MailList
export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()

    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(mails => setMails(mails))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <div className="mail-index">
            {/* render folders */}
            {/* render mail list */}
            <MailFilter onSetFilter={onSetFilter}/>
            <MailList />
        </div>
    )
}

