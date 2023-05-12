// note service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTES_STORAGE_KEY = 'notesDB'
export const notesService = {
  query,
  createNote,
  remove,
  get,
  duplicateNote,
  save,
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

function remove(noteId) {
  return storageService.remove(NOTES_STORAGE_KEY, noteId)
}

function get(noteId) {
  return storageService.get(NOTES_STORAGE_KEY, noteId)
}

function duplicateNote(noteId) {
  return query()
    .then(notes => {
      const note = notes.find(note => note.id === noteId)
      const duplicatedNote = JSON.parse(JSON.stringify(note))
      delete duplicatedNote.id
      return duplicatedNote
    })
    .then(note => {
      console.log('note:', note)
      return save(note)
    })
}

function createNote({ type, info }) {
  const note = {
    type,
    reminder: false,
    isPinned: false,
    isArchived: false,
    isDeleted: false,
    info,
    style: { backgroundColor: 'none' },
  }
  if (note.info.todos) {
    const todos = note.info.todos

    note.info.todos = todos.map(todo => ({
      id: utilService.makeId(),
      txt: todo,
      isChecked: false,
    }))
  }
  return save(note)
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_STORAGE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'fjf4301',
        type: 'note-todos',
        reminder: 0,
        isPinned: false,
        isArchived: true,
        isDeleted: false,
        info: {
          title: 'chilling todos!!',
          txt: '',
          url: null,
          todos: [
            {
              id: '54324',
              txt: 'pick up the cat from school',
              isChecked: true,
            },
            {
              id: 'fdsf43u',
              txt: 'take care of the garbage',
              isChecked: true,
            },
            {
              id: 'fd4432sf43u',
              txt: 'ppay rent',
              isChecked: false,
            },
            {
              id: '4350vcx',
              txt: 'call my love',
              isChecked: false,
            },
          ],
        },
        style: {
          backgroundColor: '#43435',
        },
      },
      {
        id: '4532f',
        createdAt: 1111222,
        type: 'note-vid',
        isPinned: false,
        isArchived: false,
        isDeleted: false,
        info: {
          title: 'Nature is great',
          txt: 'https://www.youtube.com/watch?v=xykQaTJcrqA',
          url: 'https://www.youtube.com/embed/xykQaTJcrqA',
          todos: [],
        },
        style: {
          backgroundColor: '#cb4f8',
        },
      },
      {
        id: '4gfdgjq',
        type: 'note-img',
        isPinned: false,
        isArchived: false,
        isDeleted: false,
        info: {
          url: 'https://images.unsplash.com/photo-1683009427666-340595e57e43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'The sea is so blue',
        },
        style: {
          backgroundColor: '#fohc4s',
        },
      },

      {
        id: 'n1031',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'love is true', txt: 'Fullstack Me Baby!' },
      },

      {
        id: 'n134621',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'bjfhjsd',
        type: 'note-img',
        isPinned: false,
        isArchived: false,
        isDeleted: false,
        info: {
          url: 'https://images.unsplash.com/photo-1683269102986-c96674b029b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          title: 'some greenery',
        },
        style: {
          backgroundColor: '#fohc4s',
        },
      },

      {
        id: 'n13bf21',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'nsan101',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'love is true', txt: 'Fullstack Me Baby!' },
      },
      {
        id: 'n13b21',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'n132221',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
      {
        id: 'n13f21',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#00d' },
        info: { title: 'only adam', txt: 'in adam we trust!' },
      },
    ]
  }
  utilService.saveToStorage(NOTES_STORAGE_KEY, notes)
}
