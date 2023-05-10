const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { DataTable } from "../cmps/mail-list.jsx"

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

    // maybe showLoader() someday
    if(!mails) return <h2>Loading...</h2>
    return (
        <div className="mail-index">
            {/* render folders - they are also filters(status) */}
            <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <DataTable mails={mails} />
        </div>
    )
}

