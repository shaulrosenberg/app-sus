const { useState, useEffect, useRef } = React
// for next/prev email
const { useNavigate, useParams, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js";


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)

    const { mailId } = useParams()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        loadMail()
        loadNextMailId()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issued in mail details:', err);
                navigate('/mail')
            })
    }

    function loadNextMailId() {
        mailService.getNextMailId(mailId)
            .then(setNextMailId)
    }

    function onClickTrash(mailId) {
        if (mail.status === 'trash') {
            mailService.remove(mailId)
                .then(() => navigate('/mail'))
        }

        onToggleAttr(mailId, 'status', 'trash')
        navigate('/mail')
    }

    function onToggleAttr(mailId, attr, value) {
        return mailService.get(mailId)
            .then(mail => {
                mail[attr] = value
                return mail
            })
            .then(mailService.save)
    }

    function loadNextMail() {
        navigate(`/mail/${nextMailId}`)
    }

    function loadNextMail() {
        
    }

    if (!mail) return <h2 className="mail-loader">Loading...</h2>
    return (
        <section className="mail-details">
            <div className="mail-details-header">
                <button onClick={() => navigate('/mail')}>Back</button>
                <div>
                    <button onClick={() => onReplyMail(mail.id)}>Reply</button>
                    <button onClick={() => onClickTrash(mail.id)}>Trash</button>
                    <button onClick={() => onToggleAttr(mail.id, 'isStarred', true)}>Mark starred</button>
                    <button onClick={loadNextMail}>Next</button>
                </div>
            </div>

            <div className="mail-details-body">
                <h3>{mail.subject}</h3>
                <h4>{mail.from}</h4>
                <p>{mail.body}</p>
            </div>
        </section>
    )
}