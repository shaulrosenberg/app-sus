// note service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {}

const note = {
  id: 'n101',
  createdAt: 1112222,
  type: 'NoteTxt',
  isPinned: true,
  style: { backgroundColor: '#00d' },
  info: { txt: 'Fullstack Me Baby!' },
}

const loggedInUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus',
}
const filterBy = {
  type: '',
  txt: '',
}

function query(filterBy) {
  // return notes according to searched params
}

function get(noteIx) {
  // return storageService()
}

function remove() {}
