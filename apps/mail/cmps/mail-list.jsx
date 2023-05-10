import { DataTableRow } from "./mail-preview.jsx"

export function DataTable({ mails }) {
    // const [expandedRowId, setExpandedRowId] = useState(false)

    return (
        <table border="1" className="mail-list">
            <thead>
                {/* nothing yet */}
            </thead>
            <tbody>
                {mails.map(mail => <DataTableRow key={mail.id} mail={mail} />)}
            </tbody>
        </table>
    )
}
