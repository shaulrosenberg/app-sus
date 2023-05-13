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
import { NotesFilter } from '../cmps/notes-filter.jsx'

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filterBy, setFilterBy] = useState(notesService.getDefaultFilter())

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
  }

  function loadNotes() {
    notesService.query(filterBy).then(notes => setNotes(notes))
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
      {/* <NotesFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
      <AddNoteSection onUpdate={handleUpdate} />
      <NoteList onUpdate={handleUpdate} notes={notes} />
      <FilterControls />
    </section>
  )
}
