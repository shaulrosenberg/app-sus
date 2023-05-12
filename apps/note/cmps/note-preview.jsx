const { useState, useRef, useEffect } = React
import { notesService } from '../services/note.service.js'
export function NotePreview({ onUpdate, note }) {
  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  const chosenId = useRef('')
  function openModal(event) {
    const { clientX, clientY } = event
    setModalPosition({ x: clientX, y: clientY })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  function ColorInput({ onUpdate }) {
    const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']

    function onChooseColor(color) {
      const newStyle = { backgroundColor: color }
      onUpdate('bgColorChange', chosenId.current, newStyle)
    }

    return (
      <section className="color-input">
        <div className="items-container">
          {colors.map(color => (
            <div
              className="item"
              key={color}
              style={{ backgroundColor: color, width: '30px', height: '30px' }}
              onClick={() => onChooseColor(color)}
            ></div>
          ))}
        </div>
        <h3>pick a color!</h3>
      </section>
    )
  }

  return (
    <section
      className={`note-preview ${note.type}`}
      style={{
        background: `${note.style.backgroundColor}`,
      }}
    >
      <DynamicPreview note={note} />
      <div className="note-preview-toolbar">
        <button
          className="note-btn color-select"
          title={'Choose note color'}
          onClick={event => {
            chosenId.current = note.id
            openModal(event)
          }}
        ></button>
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: modalPosition.y,
              left: modalPosition.x,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ background: '#fff', padding: '20px' }}>
              <ColorInput onUpdate={onUpdate} />
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
        <button className="note-btn archive-btn"></button>
        <button
          className="note-btn duplicate-btn"
          title={'Duplicate note'}
          onClick={() => onUpdate('duplicate', note.id)}
        ></button>
        <button
          className="note-btn bin-btn"
          title={'Delete note '}
          onClick={() => onUpdate('remove', note.id)}
        ></button>
      </div>
    </section>
  )
}

function ColorInput({ onUpdate }) {
  const colors = ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']

  function onChooseColor(color) {
    const newStyle = { backgroundColor: color }
    onUpdate('bgColorChange', chosenId.current, newStyle)
  }

  return (
    <section className="color-input">
      <div className="items-container">
        {colors.map(color => (
          <div
            className="item"
            key={color}
            style={{ backgroundColor: color, width: '30px', height: '30px' }}
            onClick={() => onChooseColor(color)}
          ></div>
        ))}
      </div>
      <h3>pick a color!</h3>
    </section>
  )
}

function NoteTxt(props) {
  return (
    <React.Fragment>
      <h3 className="note-preview-title">{props.note.info.title}</h3>
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
      <h3>{title}</h3>
    </div>
  )
}

function NoteTodos(props) {
  const { title, todos } = props.note.info
  return (
    <div className="note-preview-content-note-todos">
      <h3>{title}</h3>
      <ul>
        {todos.map((todo, idx) => (
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
}

function DynamicPreview(props) {
  switch (props.note.type) {
    case 'note-txt':
      return <NoteTxt {...props} />
    case 'note-vid':
      return <NoteVid {...props} />
    case 'note-img':
      return <NoteImg {...props} />
    case 'note-todos':
      return <NoteTodos {...props} />
  }
}
