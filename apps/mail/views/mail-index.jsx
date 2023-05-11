const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Outlet } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailFolders } from "../cmps/mail-folders.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { showSuccessMsg } from "../../../services/event-bus.service.js"



// smart component will query emails, and pass them down to MailList
export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()

    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(mails => setMails(mails))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onDeleteMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg(`Mail (${mailId}) removed!`)
        })
    }

    // maybe showLoader() someday
    if (!mails) return <h2>Loading...</h2>
    return (
        <div className="mail-index">
            {/* render folders - they are also filters(status) */}
            <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <MailCompose />
            <MailFolders />
            <Outlet />
            {!params.mailId && <MailList mails={mails} onDeleteMail={onDeleteMail} />}
        </div>
    )
}

