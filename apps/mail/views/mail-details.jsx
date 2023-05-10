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


    if(!mail) return <h2>Loading...</h2>
    return (
        <section className="mail-details">
            <div className="mail-details-header">
                <button>Back</button>
                <div>
                    <button>reply</button>
                    <button>trash</button>
                    <button>export note</button>
                    <button>mark starred</button>
                </div>
            </div>

            <div className="mail-details-body">
                
            </div>
        </section>
    )
}