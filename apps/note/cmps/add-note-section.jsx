import { notesService } from '../services/note.service.js'
const { useState } = React
import { eventBusService } from '../../../services/event-bus.service.js'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
export function AddNoteSection(props) {
  const [expanded, setExpanded] = useState(false)
  const [noteType, setNoteType] = useState('note-txt')
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState('')
  const [txt, setTxt] = useState('')
  const [url, setUrl] = useState('')

  function handleExpand(type) {
    setNoteType(type)
    setExpanded(prevExpand => !prevExpand)
  }

  function handleCreateNote() {
    if (title.trim() === '' && txt.trim() === '') {
      return
    }

    handleNoteCreation({ type: noteType, title, txt })

    setTitle('')
    setTxt('')
    setExpanded(prevExpand => !prevExpand)
    setNoteType('note-txt')
  }

  function handleCreateTodo() {
    if (title.trim() === '') {
      return
    }

    handleNoteCreation({
      type: 'note-todos',
      title,
      todos: todos.split(',').map(todo => todo.trim()),
    })

    setTitle('')
    setTodos('')
    setExpanded(false)
    setNoteType('')
  }

  const handleCreateImageNote = () => {
    if (title.trim() === '' && url.trim() === '') {
      return
    }

    handleNoteCreation({ type: 'note-image', title, url })

    setTitle('')
    setUrl('')
    setExpanded(false)
    setNoteType('')
  }

  const handleCreateVideoNote = () => {
    if (title.trim() === '' && url.trim() === '') {
      return
    }

    handleNoteCreation({ type: 'note-video', title, url })

    setTitle('')
    setUrl('')
    setExpanded(false)
    setNoteType('')
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (noteType === '') {
        handleCreateNote()
      } else if (noteType === 'note-todos') {
        handleCreateTodo()
      } else if (noteType === 'note-image') {
        handleCreateImageNote()
      } else if (noteType === 'note-video') {
        handleCreateVideoNote()
      }
    }
  }

  const renderContent = () => {
    if (!expanded) {
      return (
        <div className="note-input" onClick={() => handleExpand('note-txt')}>
          <p className="placeholder">Whats on your mind...?</p>
          <div className="note-type-selection-container">
            <button
              className="add-note-btn todo-done-btn"
              title="New note with todo a list"
              onClick={() => handleExpand('note-todos')}
            ></button>

            <button
              className="add-note-btn add-img-btn"
              title="New note with image"
              onClick={() => handleExpand('note-image')}
            ></button>
            <button
              className="add-note-btn add-vid-btn"
              title="New note with video"
              onClick={() => handleExpand('note-video')}
            ></button>
          </div>
        </div>
      )
    }

    if (noteType === 'note-txt') {
      return (
        <div className="note-txt-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Note"
            value={txt}
            onChange={e => setTxt(e.target.value)}
          />
          <div className="add-note-type-controls">
            <button onClick={handleCreateNote}>Create</button>
            <button onClick={() => setExpanded(false)}>Cancel</button>
          </div>
        </div>
      )
    }

    if (noteType === 'note-todos') {
      return (
        <div className="note-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter a comma separated list of todos"
            value={todos}
            onChange={e => setTodos(e.target.value)}
          />

          <button onClick={handleCreateTodo}>Create</button>
        </div>
      )
    }

    if (noteType === 'note-image') {
      return (
        <div className="note-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter an image URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button onClick={handleCreateImageNote}>Create</button>
        </div>
      )
    }

    if (noteType === 'note-video') {
      return (
        <div className="note-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter a video URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button onClick={handleCreateVideoNote}>Create</button>
        </div>
      )
    }

    return null
  }

  const handleOutsideClick = event => {
    if (event.target.classList.contains('note-input')) {
      return
    }
    setExpanded(false)
    setNoteType('')
  }

  function handleNoteCreation({ type, title, ...rest }) {
    const info = { title, ...rest }
    const note = { type, info }
    notesService
      .createNote(note)
      .then(note => props.onUpdate('add', null, note))
  }

  return <section className="add-note-section">{renderContent()}</section>
}
