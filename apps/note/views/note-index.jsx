const { useEffect, useState } = React
const { useParams, useNavigate, Outlet } = ReactRouterDOM

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

  function handleUpdate(updateType, noteId, additionalInfo, noteType) {
    if (updateType === 'add') {
      if (noteType === 'note-txt') {
        notesService
          .createNote('note-txt', additionalInfo)
          .then(() => loadNotes())
          .then(() => showSuccessMsg('note added'))
      } else if (noteType === 'note-todos') {
        notesService
          .createNote('note-todos', additionalInfo)
          .then(() => loadNotes())
          .then(() => showSuccessMsg('note added'))
      } else if (noteType === 'note-img') {
        notesService
          .createNote('note-img', additionalInfo)
          .then(() => loadNotes())
          .then(() => showSuccessMsg('note added'))
      } else if (noteType === 'note-vid') {
        notesService
          .createNote('note-vid', additionalInfo)
          .then(() => loadNotes())
          .then(() => showSuccessMsg('note added'))
      }
    } else if (updateType === 'trash') {
      onToggleAttr(noteId, 'status', 'trash')
    } else if (updateType === 'duplicate') {
      notesService.duplicateNote(noteId).then(duplicatedNote => {
        setNotes([...notes, duplicatedNote])
        showSuccessMsg(`Note (${noteId}) duplicated!`)
      })
    } else if (updateType === 'bgColorChange') {
      onToggleAttr(noteId, 'style', additionalInfo)
    } else if (updateType === 'archive') {
      onToggleAttr(noteId, 'status', 'archived')
    }
  }

  return (
    <section className="notes-index">
      {/* <NotesFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
      <AddNoteSection onUpdate={handleUpdate} />
      <NoteList onUpdate={handleUpdate} notes={notes} />
      <FilterControls onSetFilter={onSetFilter} filterBy={filterBy} />
      {/* <Outlet /> */}
    </section>
  )
}
