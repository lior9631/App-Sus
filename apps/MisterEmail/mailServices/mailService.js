import utils from '../../../services/utils.js'
import storageService from '../../../services/storageService.js'


const STORAGE_KEY = 'mails'


export default {
    getMails,
    getById,
    putRead,
    remove
}

const gDefaultMails = [_createMail('instagram', 'wawawawa'), _createMail('instagram', 'wawawawa'), _createMail('instagram', 'wawawawa'), _createMail('instagram', 'wawawawa')]

var gMails = null

_createMails()

function _createMails() {
    gMails = storageService.load(STORAGE_KEY, gDefaultMails)
    storageService.store(STORAGE_KEY, gMails)

}

function _createMail(subject, body, isRead, sentAt, id) {
    return {
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        id: utils.makeId()
    }
}


function getMails() {
    return Promise.resolve(gMails)
}


function getById(id) {
    return Promise.resolve(gMails.find(mail => mail.id === id))
}


function putRead(id) {
    var mail = gMails.find(mail => mail.id === id)
    mail.isRead = true
}

function remove(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId)
    gMails.splice(mailIdx, 1)

    storageService.store(STORAGE_KEY, gMails)
    return Promise.resolve();
}
