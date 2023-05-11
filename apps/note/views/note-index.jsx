const { useEffect, useState } = React

import { NotePreview } from '../cmps/note-preview.jsx'
import { notesService } from '../services/note.service.js'
import { AddNoteSection } from '../cmps/add-note-section.jsx'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/note-list.jsx'

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    loadNotes()
    // showSuccessMsg('Welcome to notes baby')
  }, [])

  function loadNotes() {
    notesService.query().then(notes => setNotes(notes))
  }

  return (
    <section className="notes-index">
      <section className="list-container">
        <AddNoteSection />
        <NoteList notes={notes} />
      </section>
    </section>
  )
}
