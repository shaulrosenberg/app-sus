import { notesService } from '../services/note.service.js'
const { useState } = React
import { eventBusService } from '../../../services/event-bus.service.js'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'
export function AddNoteSection(props) {
  const [expanded, setExpanded] = useState(false)
  const [noteType, setNoteType] = useState('')
  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState('')
  const [txt, setTxt] = useState('')
  const [url, setUrl] = useState('')

  function handleExpand(type) {
    setNoteType(type)

    setExpanded(true)
  }

  function handleCreateNote() {
    if (title.trim() === '' && txt.trim() === '') {
      return
    }
    props.onUpdate('add', null, { title: title, txt: txt }, 'note-txt')

    setTitle('')
    setTxt('')
    setExpanded(false)
    setNoteType('')
  }

  function handleCreateTodo() {
    if (title.trim() === '') {
      return
    }

    props.onUpdate(
      'add',
      null,
      {
        title: title,
        todos: todos.split(','),
      },
      'note-todos'
    )

    setTitle('')
    setTodos('')
    setExpanded(false)
    setNoteType('')
  }

  const handleCreateImageNote = () => {
    if (title.trim() === '' && url.trim() === '') {
      return
    }

    props.onUpdate('add', null, { title: title, url: url }, 'note-img')

    setTitle('')
    setUrl('')
    setExpanded(false)
    setNoteType('')
  }

  const handleCreateVideoNote = () => {
    if (title.trim() === '' && url.trim() === '') {
      return
    }
    debugger
    props.onUpdate('add', null, { title: title, url: url }, 'note-vid')

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
      } else if (noteType === 'note-img') {
        handleCreateImageNote()
      } else if (noteType === 'note-vid') {
        handleCreateVideoNote()
      }
    }
  }

  const handleOutsideClick = event => {
    if (event.target.classList.contains('note-input')) {
      return
    }
    setExpanded(false)
    setNoteType('')
  }

  const renderContent = () => {
    if (!expanded) {
      return (
        <div className="note-input">
          <p className="placeholder" onClick={() => handleExpand('note-txt')}>
            Whats on your mind...?
          </p>
          <div className="note-type-selection-container">
            <button
              className="add-note-btn todo-done-btn"
              title="New note with todo a list"
              onClick={() => handleExpand('note-todos')}
            ></button>

            <button
              className="add-note-btn add-img-btn"
              title="New note with image"
              onClick={() => handleExpand('note-img')}
            ></button>
            <button
              className="add-note-btn add-vid-btn"
              title="New note with video"
              onClick={() => handleExpand('note-vid')}
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
        <div className="note-todos-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="todos-list"
            type="text"
            placeholder="enter a comma separated list of todos"
            value={todos}
            onChange={e => setTodos(e.target.value)}
          />
          <div className="add-note-type-controls">
            <button onClick={handleCreateTodo}>Create</button>
            <button onClick={() => setExpanded(false)}>Cancel</button>
          </div>
        </div>
      )
    }

    if (noteType === 'note-img') {
      return (
        <div className="note-img-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="url-input"
            type="text"
            placeholder="Enter an image URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <div className="add-note-type-controls">
            <button onClick={handleCreateImageNote}>Create</button>
            <button onClick={() => setExpanded(false)}>Cancel</button>
          </div>
        </div>
      )
    }

    if (noteType === 'note-vid') {
      return (
        <div className="note-vid-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="url-input"
            type="text"
            placeholder="Enter a video URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <div className="add-note-type-controls">
            <button onClick={handleCreateVideoNote}>Create</button>
            <button onClick={() => setExpanded(false)}>Cancel</button>
          </div>
        </div>
      )
    }

    return null
  }

  return <section className="add-note-section">{renderContent()}</section>
}
