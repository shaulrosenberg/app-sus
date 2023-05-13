export function MailCompose({ onOpenMailModal }) {
    return (
        <button onClick={onOpenMailModal} className="compose-link">
            <span></span>
            <span>Compose</span>
        </button>
    )
}