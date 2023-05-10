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
        mailService.get(params.mailId)
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

    return (
        <p>Mail details</p>
    )
}