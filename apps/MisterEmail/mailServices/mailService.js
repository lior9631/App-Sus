import utils from '../../../services/utils.js'
import storageService from '../../../services/storageService.js'


const STORAGE_KEY = 'mails'


export default {
    
    getById,
    putRead,
    remove,
    query, 
    save
}

const gDefaultMails = [_createMail('facebook', 'shahar peretz'), _createMail('instagram', 'alo dai'), _createMail('twiter', 'lior ganel'), _createMail('linkedin', 'yaronBiton')]

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

function save(mailToSave) {
    var savedMail = mailToSave;
    if (mailToSave.id) {
        const mailIdx = gMails.findIndex(mail => mail.id === mailToSave.id)
        gMails[mailIdx] = mailToSave;
    } else {
        savedMail = _createMail(mailToSave.subject, mailToSave.body)
        gMails.push(savedMail)
    }
    storageService.store(STORAGE_KEY, gMails)


    return Promise.resolve(savedMail)
}


function getById(id) {
    return Promise.resolve(gMails.find(mail => mail.id === id))
}

function query(filterBy) {
    var mails = gMails;
    console.log('fb' , filterBy);
    
    if (filterBy) {
        var { words , isRead } = filterBy
        mails = gMails.filter(mail => (mail.subject.includes(words) || mail.body.includes(words)))
        if(isRead === true || isRead === false) mails = mails.filter(mail => mail.isRead === isRead)
        
    }


    return Promise.resolve(mails);
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
