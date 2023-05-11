export function NotePreview({ note }) {
  return (
    <section className={`note-preview ${note.type} `}>
      <DynamicPreview note={note} />
      <div className="note-preview-toolbar">
        <button className="note-btn reminder-btn"></button>
        <button className="note-btn color-select"></button>
        <button className="note-btn archive-btn"></button>
        <button className="note-btn duplicate-btn"></button>
        <button className="note-btn bin-btn"></button>
      </div>
    </section>
  )
}

function NoteTxt(props) {
  return (
    <React.Fragment>
      <h2 className="note-preview-title">{props.note.info.title}</h2>
      <p className="note-preview-content">{props.note.info.txt}</p>
    </React.Fragment>
  )
}

function NoteImg(props) {
  const { title, url } = props.note.info
  return (
    <div className="note-preview-content-note-img">
      <img src={url} alt="use-img" />
      <h3>{title}</h3>
    </div>
  )
}

function NoteVid(props) {
  const { title, url } = props.note.info

  return (
    <div className="note-preview-content-note-vid">
      <iframe src={url}></iframe>
      <h2>{title}</h2>
    </div>
  )
}

function NoteTodos(props) {
  const { title, todos } = props.note.info

  return (
    <div className="note-preview-content-note-todos">
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.isChecked ? 'line-through' : 'none',
            }}
          >
            {todo.txt}
          </li>
        ))}
      </ul>
    </div>
  )
  // return <h3>{title}</h3>
}

function DynamicPreview(props) {
  switch (props.note.type) {
    case 'NoteTxt':
      return <NoteTxt {...props} />
    case 'note-vid':
      return <NoteVid {...props} />
    case 'note-img':
      return <NoteImg {...props} />
    case 'note-todos':
      return <NoteTodos {...props} />
  }
}
