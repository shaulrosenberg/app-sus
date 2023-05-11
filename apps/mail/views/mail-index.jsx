const { useState, useEffect, useRef } = React
const { useParams, useNavigate, Outlet } = ReactRouterDOM

import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/mail-list.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailFolders } from "../cmps/mail-folders.jsx"
import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailCreate } from "../cmps/mail-create.jsx"



// smart component will query emails, and pass them down to MailList
export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isShowCompose, setIsShowCompose] = useState(false)
    const countMailMap = useRef(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
        mailService.query()
        .then(mails => countMailMap.current = mailService.countMailElements(mails))
    }, [])

    useEffect(() => {
        loadMails()

    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then(setMails)
    }

    function onSetFilter(filterBy) {
        console.log(filterBy) //remove
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onDeleteMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedMails = mails.filter(mail => mail.id !== mailId)
            setMails(updatedMails)
            showSuccessMsg(`Mail (${mailId}) removed!`)
        })
    }

    function onAddMail(mail) {
        mailService.save(mail)
            .then(() => {
                // setEmails
                showSuccessMsg(`Mail sent!`)
                onCloseMailModal()
                loadMails()
            })
    }

    function onCloseMailModal() {
        setIsShowCompose(false)
    }

    function onOpenMailModal() {
        setIsShowCompose(true)
    }

    // maybe showLoader() someday
    if (!mails) return <h2>Loading...</h2>
    return (
        <div className="mail-index">
            {/* render folders - they are also filters(status) */}
            <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <MailCompose onOpenMailModal={onOpenMailModal} />
            <MailFolders onSetFilter={onSetFilter} filterBy={filterBy} countMailMap={countMailMap.current}/>
            <Outlet />
            {!params.mailId && <MailList mails={mails} onDeleteMail={onDeleteMail} />}
            {isShowCompose && <MailCreate onCloseMailModal={onCloseMailModal} onAddMail={onAddMail} />}
        </div>
    )
}

