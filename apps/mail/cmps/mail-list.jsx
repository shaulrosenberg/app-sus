import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onDeleteMail, onToggleAttr }) {
    return (
        <table className="mail-list">
            <thead>
                {/* nothing yet */}
            </thead>
            <tbody>
                {mails.map(mail => <MailPreview key={mail.id} mail={mail} onDeleteMail={onDeleteMail} onToggleAttr={onToggleAttr}/>)}
            </tbody>
        </table>
    )
}
