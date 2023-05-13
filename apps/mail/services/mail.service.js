// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getNextMailId,
    getLoggedInUser,
    countMailElements,
}

const MAIL_KEY = 'mailDB'

_createMails()

const gLoggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus',
}


function query(filterBy = {}) {
    const { isRead, isStarred, labels, txt, status } = filterBy

    return storageService.query(MAIL_KEY).then((mails) => {
        if (filterBy.txt) {
            const regExp = new RegExp(txt, 'i')
            mails = mails.filter(
                (mail) =>
                    regExp.test(mail.subject) ||
                    regExp.test(mail.from) ||
                    regExp.test(mail.body)
            )
        }

        if (status === 'starred') {
            mails = mails.filter((mail) => mail.isStarred)
        } else if (status) {
            mails = mails.filter((mail) => mail.status === status)
        }

        // if (isRead !== undefined) {
        //     mails = mails.filter((mail) => mail.isRead === isRead)
        // }

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
    return storageService.query(MAIL_KEY).then(mails => {
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
        to: '',
    }
}

function countMailElements(mailArray) {
    const entityTypeMap = {}

    mailArray.forEach(mail => {
        const entityType = mail.status
        if (entityTypeMap[entityType]) {
            entityTypeMap[entityType]++
        } else {
            entityTypeMap[entityType] = 1
        }
    })

    return entityTypeMap
}

function getLoggedInUser() {
    return gLoggedInUser
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '', // no need to support complex text search
        isRead: true, // (optional property, if missing: show all)
        // isStarred: true, // (optional property, if missing: show all)
        labels: [], // empty array or remove the property
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
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e102',
                status: 'inbox',
                subject: 'Activity in Shared Folders',
                body: 'Shinjuro and 55 others made changes in your shared folders',
                isRead: false,
                isStarred: true,
                sentAt: 1551133930594,
                removedAt: null,
                from: '<no-reply@dropbox.com>',
                to: 'user@appsus.com',
            },
            {
                id: 'e103',
                status: 'inbox',
                subject: 'Your job alert for web developer',
                body: '3 new jobs in Israel match your preferences.',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: '<jobalerts-noreply@linkedin.com>',
                to: 'user@appsus.com',
            },
            {
                id: 'e104',
                status: 'inbox',
                subject: 'Vacation Plans',
                body: "Let's plan a vacation together. Any preferences?",
                isRead: true,
                isStarred: false,
                sentAt: 1551133969976,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e105',
                status: 'inbox',
                subject: 'Job Opportunity',
                body: 'We have an exciting job opportunity for you. Are you interested?',
                isRead: false,
                isStarred: false,
                sentAt: 1551133983103,
                removedAt: null,
                from: 'recruiter@company.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e106',
                status: 'inbox',
                subject: 'Meeting Reminder',
                body: 'Just a reminder that our meeting is scheduled for tomorrow at 2 PM.',
                isRead: false,
                isStarred: false,
                sentAt: 1551133996237,
                removedAt: null,
                from: 'colleague@company.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e107',
                status: 'inbox',
                subject: 'Dinner Invitation',
                body: 'Join us for dinner at our place this Saturday. RSVP by tomorrow.',
                isRead: true,
                isStarred: false,
                sentAt: 1551134009371,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e108',
                status: 'inbox',
                subject: 'New Product Launch',
                body: 'Introducing our latest product! Check it out on our website.',
                isRead: true,
                isStarred: true,
                sentAt: 1551134022505,
                removedAt: null,
                from: 'marketing@company.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e109',
                status: 'inbox',
                subject: 'Happy Birthday!',
                body: 'Wishing you a fantastic birthday filled with joy and happiness!',
                isRead: false,
                isStarred: false,
                sentAt: 1551134035639,
                removedAt: null,
                from: 'friend@example.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e110',
                status: 'inbox',
                subject: 'Weekend Getaway',
                body: "Let's plan a weekend getaway. I found some great travel deals.",
                isRead: false,
                isStarred: false,
                sentAt: 1551134048773,
                removedAt: null,
                from: 'popo@codingacademy.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e111',
                status: 'inbox',
                subject: 'Meeting Reminder',
                body: "Just a friendly reminder that our team meeting is scheduled for tomorrow at 10 AM. Don't forget to bring your reports.",
                isRead: false,
                isStarred: false,
                sentAt: 1651587600000, // May 3, 2022, 10:00 AM UTC
                removedAt: null,
                from: 'john.doe@example.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e112',
                status: 'inbox',
                subject: 'Important Update: Project Deadline Extended',
                body: "Hello, I hope you're doing well. I wanted to inform you that the deadline for our ongoing project has been extended by one week. This will give us more time to refine the deliverables. If you have any questions, feel free to reach out.",
                isRead: false,
                isStarred: false,
                sentAt: 1651358400000, // May 1, 2022, 9:00 AM UTC
                removedAt: null,
                from: 'jane.smith@example.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e113',
                status: 'inbox',
                subject: 'Job Application Status',
                body: "Thank you for applying for the position of Software Engineer at our company. We appreciate your interest. After carefully reviewing your application, we have shortlisted you for the next round of interviews. Please find attached the details for the upcoming interview. Good luck!",
                isRead: false,
                isStarred: false,
                sentAt: 1651065600000, // April 27, 2022, 8:00 AM UTC
                removedAt: null,
                from: 'hr@companyname.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e114',
                status: 'trash',
                subject: 'Last Chance: Limited Time Offer',
                body: "This is your last chance to take advantage of our limited-time offer. Don't miss out on the opportunity to save big on your favorite products.",
                isRead: true,
                isStarred: false,
                sentAt: 1650878400000, // April 25, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'newsletter@companyname.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e115',
                status: 'trash',
                subject: 'Account Suspension Notice',
                body: "We regret to inform you that your account has been suspended due to a violation of our terms of service. To resolve this issue, please contact our support team as soon as possible.",
                isRead: true,
                isStarred: false,
                sentAt: 1650705600000, // April 23, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'support@companyname.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e116',
                status: 'trash',
                subject: 'Weekly Newsletter',
                body: "Welcome to our weekly newsletter! Stay up to date with the latest news, trends, and offers in the industry. Don't miss out on the valuable content we have in store for you.",
                isRead: true,
                isStarred: false,
                sentAt: 1650528000000, // April 21, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'newsletter@companyname.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e117',
                status: 'trash',
                subject: 'Invitation: Networking Event',
                body: "You're invited to our upcoming networking event. This is a great opportunity to expand your professional network and connect with industry experts. RSVP now to secure your spot.",
                isRead: true,
                isStarred: false,
                sentAt: 1650345600000, // April 19, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'events@companyname.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e118',
                status: 'trash',
                subject: 'Package Shipment Update',
                body: "Your package with tracking number XYZ123456789 is on its way and will be delivered to your address soon. Please ensure someone is available to receive it.",
                isRead: true,
                isStarred: false,
                sentAt: 1650163200000, // April 17, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'shipping@companyname.com',
                to: 'user@appsus.com',
            },
            {
                id: 'e119',
                status: 'sent',
                subject: 'Thank You for Your Purchase',
                body: "Thank you for your recent purchase! We appreciate your business and hope you're enjoying your new product. If you have any questions or need assistance, please don't hesitate to reach out to our support team.",
                isRead: false,
                isStarred: false,
                sentAt: 1650595200000, // April 22, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'user@appsus.com',
                to: 'sales@companyname.com',
            },
            {
                id: 'e120',
                status: 'sent',
                subject: 'New Product Announcement',
                body: "Introducing our latest product! We are thrilled to announce the launch of our new and innovative product that will revolutionize the way you work. Check out our website for more details and be among the first to experience it.",
                isRead: false,
                isStarred: false,
                sentAt: 1650412800000, // April 20, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'user@appsus.com',
                to: 'marketing@companyname.com',
            },
            {
                id: 'e121',
                status: 'sent',
                subject: 'Upcoming Webinar: Boost Your Productivity',
                body: "Join us for an informative webinar on productivity hacks and strategies to maximize your efficiency. Our industry expert will share valuable insights and practical tips that you can implement right away. Register now to secure your spot.",
                isRead: false,
                isStarred: false,
                sentAt: 1650220800000, // April 18, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'user@appsus.com',
                to: 'webinars@companyname.com',
            },
            {
                id: 'e122',
                status: 'sent',
                subject: 'Holiday Greetings and Special Offer',
                body: "Wishing you a joyful holiday season filled with happiness and success. As a token of our appreciation, we have a special offer exclusively for our valued customers. Don't miss out on this opportunity to save on your next purchase.",
                isRead: false,
                isStarred: false,
                sentAt: 1650038400000, // April 16, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'user@appsus.com',
                to: 'newsletter@companyname.com',
            },
            {
                id: 'e123',
                status: 'sent',
                subject: 'Important Account Security Notice',
                body: "We take the security of your account seriously. As part of our ongoing efforts to ensure your safety, we have implemented additional security measures. Please review your account settings and update your password to enhance your account security.",
                isRead: false,
                isStarred: false,
                sentAt: 1649856000000, // April 14, 2022, 12:00 PM UTC
                removedAt: null,
                from: 'user@appsus.com',
                to: 'security@companyname.com',
            }
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}
