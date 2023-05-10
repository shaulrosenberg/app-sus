// note service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTES_STORAGE_KEY = 'notesDB'
export const notesService = {
  query,
}

_createNotes()

function query() {
  return storageService.query(NOTES_STORAGE_KEY).then(notes => notes)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_STORAGE_KEY, note)
  } else {
    return storageService.post(NOTES_STORAGE_KEY, note)
  }
}

function createNote(type, info) {
  const note = {
    id: utilService.makeId(),
    type,
    reminder: false,
    isPinned: false,
    isArchived: false,
    isDeleted: false,
    info,
    style: { backgroundColor: 'none' },
  }
  save(note)
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_STORAGE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ]
  }
  utilService.saveToStorage(NOTES_STORAGE_KEY, notes)
}
