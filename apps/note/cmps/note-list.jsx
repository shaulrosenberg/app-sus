import { NotePreview } from './note-preview.jsx'
export function NoteList({ notes }) {
  if (!notes) return <p>Loading</p>
  return (
    <section className="notes-list">
      {notes.map(note => (
        <NotePreview key={note.id} note={note} onUpdate={onUpdate} />
      ))}
    </section>
  )
}
