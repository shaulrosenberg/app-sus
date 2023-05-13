const { useState } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailCreate({ onCloseMailModal, onAddMail }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())

    function onChangeValue({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setMailToEdit(prevState => ({ ...prevState, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        const newMail = {...mailToEdit, status: 'sent'}
        console.log(newMail)
        onAddMail(newMail)
    }

    const { subject, to, body } = mailToEdit

    return (
        <section className="mail-create">
            <div className="mail-create-header">
                <span>New Message</span>
                <button className="mail-create-close" onClick={onCloseMailModal}>Close</button>
            </div>

            <form onSubmit={onSaveMail}>
                <input onChange={onChangeValue} type="text" value={to} name="to" placeholder="Recipients" className="mail-create-to" />
                <input onChange={onChangeValue} type="text" value={subject} name="subject" placeholder="Subject" className="mail-create-subject" />
                <input onChange={onChangeValue} type="text" value={body} name="body" className="mail-create-body" />

                <button className="mail-create-send">Send</button>
            </form>
        </section>
    )
}