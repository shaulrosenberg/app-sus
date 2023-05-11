const { useState } = React
export function AddNoteSection() {
  const [expanded, setExpanded] = useState(false)
  const [noteType, setNoteType] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [url, setUrl] = useState('')

  function handleExpand(type) {
    setNoteType(type)
    setExpanded(true)
  }

  function handleCreateNote() {
    if (title.trim() === '' && body.trim() === '') {
      return
    }

    handleNoteCreation({ type: noteType, title, body })

    setTitle('')
    setBody('')
    setExpanded(false)
    setNoteType('')
  }

  function handleCreateTodo() {
    if (title.trim() === '') {
      return
    }

    handleNoteCreation({ type: 'note-todos', title, todos: [] })

    setTitle('')
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
        <div className="note-input" onClick={() => handleExpand('')}>
          <span className="placeholder">Take a note</span>
        </div>
      )
    }

    if (noteType === '') {
      return (
        <div className="note-input">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Note"
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <button onClick={handleCreateNote}>Create</button>
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

  return (
    <section className="add-note-section">
      {renderContent()}
      <div className="note-type-butons">
        <button
          className="add-note-btn todo-done-btn"
          onClick={() => handleExpand('note-todos')}
        ></button>
        <button
          className="add-note-btn add-img-btn"
          onClick={() => handleExpand('note-image')}
        ></button>
        <button
          className="add-note-btn add-vid-btn"
          onClick={() => handleExpand('note-video')}
        ></button>
      </div>
    </section>
  )
}
