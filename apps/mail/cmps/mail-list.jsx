import { MailPreview } from "./mail-preview.jsx"


// TODO: pass down onDelete and onChangeField
export function MailList({ mails, onDeleteMail }) {
    // const [expandedRowId, setExpandedRowId] = useState(false)
    console.log('list re rendered')
    return (
        <table className="mail-list">
            <thead>
                {/* nothing yet */}
            </thead>
            <tbody>
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} onDeleteMail={onDeleteMail} />)}
            </tbody>
        </table>
    )
}
