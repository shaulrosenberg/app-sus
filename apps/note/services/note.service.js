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
        id: 'n1031',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'love is true', txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n134621',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'n134321',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'n13bf21',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'nsan101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'love is true', txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n13b21',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'n132221',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'n13f21',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
    ]
  }
  utilService.saveToStorage(NOTES_STORAGE_KEY, notes)
}
