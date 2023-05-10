export function NotePreview({ note }) {
  return (
    <section className="note-preview">
      <DynamicPreview class="note-content" note={note} />
      <div className="note-footer">
        <button className="note-btn img-reminder"></button>
        <button className="fa fa-envelope-close"></button>
        <button className="fa fa-archive"></button>
      </div>
    </section>
  )
}

function NoteTxt(props) {
  console.log('props:', props)
  return (
    <React.Fragment>
      <h2 className={'note-title'}>{props.note.info.title}</h2>
      <p className="note-content">{props.note.info.txt}</p>
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
