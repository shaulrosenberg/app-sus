export function NotePreview({ note }) {
  return (
    <section className="note-preview">
      <DynamicPreview class="note-preview-content" note={note} />
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

function NoteImg() {
  return
}

function NoteVideo() {}

function NoteTodos() {}

function DynamicPreview(props) {
  switch (props.note.type) {
    case 'NoteTxt':
      return <NoteTxt {...props} />
    case 'img':
      return <NoteImg {...props} />
    case 'todo':
      return <NoteTodos {...props} />
  }
}
