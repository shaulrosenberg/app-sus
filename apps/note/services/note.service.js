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
  getDefaultFilter,
  getEmptyNote,
}

_createNotes()

function query(filterBy = {}) {
  return storageService.query(NOTES_STORAGE_KEY).then(notes => {
    if (filterBy.status) {
      notes = notes.filter(note => note.status === filterBy.status)
    }
    return notes
  })
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

function createNote(type, info) {
  const note = {
    type,
    status: 'notes',
    reminder: false,
    isPinned: false,
    isArchived: false,
    isDeleted: false,
    info,

    style: { backgroundColor: 'white' },
  }
  if (type === 'note-todos') {
    const todos = note.info.todos

    note.info.todos = todos.map(todo => ({
      id: utilService.makeId(),
      txt: todo,
      isChecked: false,
    }))
  }
  return save(note)
}

function getEmptyNote() {
  return {
    type,
    status: 'notes',
    reminder: false,
    isPinned: false,
    isArchived: false,
    isDeleted: false,
    info,

    style: { backgroundColor: 'white' },
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_STORAGE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'fjf4301',
        status: 'notes',
        type: 'note-todos',
        isPinned: false,
        isArchived: true,
        isDeleted: false,
        info: {
          title: 'For Tomorrow!!',
          txt: '',
          url: null,
          todos: [
            {
              id: '54431324',
              txt: 'listen to yaron give a cr',
              isChecked: false,
            },
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
              txt: 'tell yonatan he is so sexy',
              isChecked: false,
            },
            {
              id: '4350vcx',
              txt: 'call my love 💘',
              isChecked: false,
            },
          ],
        },
        style: {
          backgroundColor: '#F9FFA4',
        },
      },
      {
        id: '4532f',
        createdAt: 1111222,
        status: 'notes',
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
          backgroundColor: '#B4FF9F',
        },
      },
      {
        id: 'n293258476',
        status: 'notes',
        createdAt: 3334444,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#FFD59E' },
        info: {
          title: 'watch the eurovision ',
          txt: 'and vote for noa!',
        },
      },
      {
        id: '4gfdgjq',
        status: 'notes',
        type: 'note-img',
        isPinned: false,
        isArchived: false,
        isDeleted: false,
        info: {
          url: 'https://images.unsplash.com/photo-1683009427666-340595e57e43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'The sea is so blue',
        },
        style: {
          backgroundColor: '#B4FF9F',
        },
      },
      {
        id: 'n1343232621',
        status: 'notes',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#FFD59E' },
        info: {
          title: 'Meeting Notes',
          txt: 'Discuss project timeline and deliverables.',
        },
      },

      {
        id: 'n134621',
        status: 'notes',
        createdAt: 1112222,
        type: 'note-txt',
        isPinned: true,
        style: { backgroundColor: '#FFA1A1' },
        info: { title: 'only stav', txt: 'in stav we trust!' },
      },

      {
        id: 'bj322325',
        status: 'notes',
        type: 'note-img',
        isPinned: false,
        isArchived: false,
        isDeleted: false,
        info: {
          url: 'https://images.unsplash.com/photo-1683269102986-c96674b029b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          title: 'some greenery',
        },
        style: {
          backgroundColor: '#FFA1A1',
        },
      },
      {
        id: 'bjfhjsd',
        status: 'notes',
        type: 'note-img',
        isPinned: false,
        isArchived: false,
        isDeleted: false,
        info: {
          url: 'https://images.unsplash.com/photo-1683752590938-e3b687c1f344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
          title: 'go hiking',
        },
        style: {
          backgroundColor: '#F9FFA4',
        },
      },
    ]
  }
  utilService.saveToStorage(NOTES_STORAGE_KEY, notes)
}

function getDefaultFilter() {
  return {
    status: 'notes', //main notes page
    txt: '', // no need to support complex text search
    reminder: false,
    isPinned: true, // (optional property, if missing: show all)
    isDeleted: true, // (optional property, if missing: show all)
  }
}
