const { useEffect, useState } = React

import { NotePreview } from '../cmps/note-preview.jsx'
import { notesService } from '../services/note.service.js'
import { AddNoteSection } from '../cmps/add-note-section.jsx'
import { FilterControls } from '../cmps/filter-controls.jsx'
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
      <AddNoteSection />
      <NoteList notes={notes} />
      <FilterControls />
    </section>
  )
}
