import { NotePreview } from './note-preview.jsx'
export function NoteList({ onUpdate, notes }) {
  return (
    <section className="notes-list">
      {notes.map(note => (
        <NotePreview onUpdate={onUpdate} key={note.id} note={note} />
      ))}
    </section>
  )
}
