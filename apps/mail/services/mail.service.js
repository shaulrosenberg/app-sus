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
    getNextMailId,
    getLoggedInUser
}

const MAIL_KEY = 'mailDB'

_createMails()

const gLoggedInUser = {
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
            console.log(filterBy)
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.from) || regExp.test(mail.body))
            }
            // // true / false / undefined = show all mails
            // if (filterBy.isRead) {
            //     mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            // }
            if (filterBy.status) {
                mails = mails.filter(mail => mail.status === filterBy.status)
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
        status: 'inbox',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'user@appsus.com',
        to: ''
    }
}

function getLoggedInUser() {
    return gLoggedInUser
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '', // no need to support complex text search
        isRead: true, // (optional property, if missing: show all)
        isStared: true, // (optional property, if missing: show all)
        labels: ['important', 'romantic']
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                status: 'inbox',
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
                status: 'inbox',
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
                status: 'inbox',
                subject: 'Your job alert for web developer',
                body: '3 new jobs in Israel match your preferences.',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: '<jobalerts-noreply@linkedin.com>',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                status: 'inbox',
                subject: 'Vacation Plans',
                body: 'Let\'s plan a vacation together. Any preferences?',
                isRead: true,
                sentAt: 1551133969976,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                status: 'inbox',
                subject: 'Job Opportunity',
                body: 'We have an exciting job opportunity for you. Are you interested?',
                isRead: false,
                sentAt: 1551133983103,
                removedAt: null,
                from: 'recruiter@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e106',
                status: 'inbox',
                subject: 'Meeting Reminder',
                body: 'Just a reminder that our meeting is scheduled for tomorrow at 2 PM.',
                isRead: false,
                sentAt: 1551133996237,
                removedAt: null,
                from: 'colleague@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                status: 'inbox',
                subject: 'Dinner Invitation',
                body: 'Join us for dinner at our place this Saturday. RSVP by tomorrow.',
                isRead: true,
                sentAt: 1551134009371,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e108',
                status: 'inbox',
                subject: 'New Product Launch',
                body: 'Introducing our latest product! Check it out on our website.',
                isRead: true,
                sentAt: 1551134022505,
                removedAt: null,
                from: 'marketing@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e109',
                status: 'inbox',
                subject: 'Happy Birthday!',
                body: 'Wishing you a fantastic birthday filled with joy and happiness!',
                isRead: false,
                sentAt: 1551134035639,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e110',
                status: 'inbox',
                subject: 'Weekend Getaway',
                body: 'Let\'s plan a weekend getaway. I found some great travel deals.',
                isRead: false,
                sentAt: 1551134048773,
                removedAt: null,
                from: 'popo@codingacademy.com',
                to: 'user@appsus.com'
            }
        ]

        utilService.saveToStorage(MAIL_KEY, mails)
    }
}




