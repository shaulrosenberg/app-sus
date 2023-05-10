import { MailPreview } from "./mail-preview.jsx"


// TODO: pass down onDelete and onChangeField
export function MailList({ mails }) {
    // const [expandedRowId, setExpandedRowId] = useState(false)

    return (
        <table border="1" className="mail-list">
            <thead>
                {/* nothing yet */}
            </thead>
            <tbody>
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
            </tbody>
        </table>
    )
}
