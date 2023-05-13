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


    if (!mail) return <h2 className="mail-loader">Loading...</h2>
    return (
        <section className="mail-details">
            <div className="mail-details-header">
                <button onClick={() => navigate('/mail')}>Back</button>
                <div>
                    <button>Reply</button>
                    <button onClick={() => {mailService.remove(mail.id)}}>trash</button>
                    <button>Export note</button>
                    <button>Mark starred</button>
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