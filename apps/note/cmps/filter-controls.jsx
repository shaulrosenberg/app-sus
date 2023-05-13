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
        className={`folder-item ${activeFolder === 'notes' ? 'active' : ''}`}
      >
        <span className="light-bulb"></span>
        <span className="folder-name">Notes</span>
      </li>
      <li
        onClick={() => onChangeFolder('archived')}
        className={`folder-item ${activeFolder === 'archived' ? 'active' : ''}`}
      >
        <span className="folder-icon"></span>
        <span className="folder-name">Archived</span>
      </li>

      <li
        onClick={() => onChangeFolder('trash')}
        className={`folder-item ${activeFolder === 'trash' ? 'active' : ''}`}
      >
        <span className="folder-icon"></span>
        <span className="folder-name">Trash</span>
      </li>
    </ul>
  )
}
