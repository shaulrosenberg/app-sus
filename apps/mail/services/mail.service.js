// mail service
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getNextMailId
}

const MAIL_KEY = 'mailDB'

_createMails()

const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    labels: ['important', 'romantic'] // has any of the labels
}

function query(filterBy = {}) {
    // return filtered emails, using filterBy
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(book => regExp.test(book.title))
            }
            // true / false / undefined = show all mails
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            // add more filters (starred, status - folder, labels)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            let mailIdx = mails.findIndex(mail => mail.id === mailId)
            if (mailIdx === mails.length - 1) mailIdx = -1
            return mails[mailIdx + 1].id
        })
}

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'user@appsus.com',
        to: ''
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '', // no need to support complex text search
        // isRead: true, // (optional property, if missing: show all)
        // isStared: true, // (optional property, if missing: show all)
        // labels: ['important', 'romantic']
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Activity in Shared Folders',
                body: 'Shinjuro and 55 others made changes in your shared folders',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: '<no-reply@dropbox.com>',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Your job alert for web developer',
                body: '3 new jobs in Israel match your preferences.',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: '<jobalerts-noreply@linkedin.com>',
                to: 'user@appsus.com'
            },

        ]

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}




