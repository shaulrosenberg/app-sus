export function NotePreview({ note }) {
  return (
    <section className="note-preview">
      <DynamicPreview noteType={note.type} />
      <div className="note-toolbar">
        <button className="note-btn img-reminder"></button>
        <button className="fa fa-envelope-close"></button>
        <button className="fa fa-archive"></button>
      </div>
    </section>
  )
}

function NoteTxt(note) {
  console.log('note:', note)
  return (
    <React.Fragment>
      <h2>{note.title}</h2>
    </React.Fragment>
  )
}

function NoteImg() {
  return
}

function NoteVideo() {}

function NoteTodos() {}

function DynamicPreview(props) {
  debugger
  switch (props.type) {
    case 'NoteTxt':
      return <NoteTxt {...props} />
    case 'img':
      return <NoteImg {...props} />
    case 'todo':
      return <NoteTodos {...props} />
  }
}
