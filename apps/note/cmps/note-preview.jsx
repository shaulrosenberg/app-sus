export function NotePreview({ note }) {
  return (
    <section className="note-preview">
      <DynamicPreview />
      <div className="note-toolbar">
        <button
          type="button"
          title="Reminder"
          className="note-btn img-reminder clean-btn"
        ></button>
      </div>
    </section>
  )
}

function NoteTxt() {
  return
  ;<React.Fragment>
    <h2>{note.title}</h2>
  </React.Fragment>
}

function NoteImg() {
  return
}

function NoteVideo() {}

function NoteTodos() {}

function DynamicPreview(props) {
  switch (props.noteType) {
    case 'txt':
      return <NoteTxt {...props} />
    case 'img':
      return <NoteImg {...props} />
    case 'todo':
      return <NoteTodos {...props} />
  }
}
