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
    showSuccessMsg('Welcome to notes baby')
  }, [])

  function loadNotes() {
    notesService.query().then(notes => setNotes(notes))
  }

  function onToggleAttr(noteId, attr, value) {
    notesService
      .get(noteId)
      .then(note => {
        note[attr] = value
        return note
      })
      .then(note => notesService.save(note))
      .then(() => loadNotes())
  }

  function handleUpdate(updateType, noteId, additionalInfo) {
    if (updateType === 'add') {
      setNotes([...notes, note])
      showSuccessMsg('note added')
    } else if (updateType === 'remove') {
      notesService.remove(noteId).then(() => {
        const updatedNotes = notes.filter(note => note.id !== noteId)
        setNotes(updatedNotes)
        showSuccessMsg(`Note (${noteId}) removed!`)
      })
    } else if (updateType === 'duplicate') {
      notesService.duplicateNote(noteId).then(duplicatedNote => {
        setNotes([...notes, duplicatedNote])
        showSuccessMsg(`Note (${noteId}) duplicated!`)
      })
    } else if (updateType === 'bgColorChange') {
      onToggleAttr(noteId, 'style', additionalInfo)
    }
  }

  return (
    <section className="notes-index">
      <AddNoteSection onUpdate={handleUpdate} />
      <NoteList onUpdate={handleUpdate} notes={notes} />
      <FilterControls />
    </section>
  )
}
