const { Link, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function FilterControls({ onSetFilter, filterBy }) {
  const [activeFolder, setActiveFolder] = useState('notes')
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const navigate = useNavigate()

  function onChangeFolder(folderName) {
    const newFilter = { ...filterByToEdit }
    newFilter.status = folderName
    setActiveFolder(folderName)
    setFilterByToEdit(newFilter)
    onSetFilter(newFilter)
    navigate('/note')
  }

  return (
    <ul className="filter-controls">
      <li
        onClick={() => onChangeFolder('notes')}
        className={`folder-item-notes ${
          activeFolder === 'notes' ? 'active' : ''
        }`}
      >
        <span className="light-bulb"></span>
        <span className="folder-name-notes">Notes</span>
      </li>
      <li
        onClick={() => onChangeFolder('archived')}
        className={`folder-item-notes ${
          activeFolder === 'archived' ? 'active' : ''
        }`}
      >
        <span className="archive-btn"></span>
        <span className="folder-name-notes">Archived</span>
      </li>

      <li
        onClick={() => onChangeFolder('trash')}
        className={`folder-item-notes ${
          activeFolder === 'trash' ? 'active' : ''
        }`}
      >
        <span className="bin-btn"></span>
        <span className="folder-name-notes">Trash</span>
      </li>
    </ul>
  )
}
