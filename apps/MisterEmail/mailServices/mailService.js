import utils from '../../../services/utils.js'
import storageService from '../../../services/storageService.js'


const STORAGE_KEY = 'mails'


export default {

    getById,
    putRead,
    remove,
    query,
    save,
    setStar,
    filterByStar,
    setUnRead,
    setRead
}

const gDefaultMails = [_createMail('facebook', 'shahar peretz'), _createMail('instagram', 'alo dai'), _createMail('twiter', 'lior ganel'), _createMail('linkedin', 'yaronBiton')]

var gMails = null

_createMails()

function _createMails() {
    gMails = storageService.load(STORAGE_KEY, gDefaultMails)
    storageService.store(STORAGE_KEY, gMails)
    if (!gMails.length) gMails = [_createMail('facebook', 'shahar peretz'), _createMail('instagram', 'alo dai'), _createMail('twiter', 'lior ganel'), _createMail('linkedin', 'yaronBiton')]

}

function _createMail(subject, body) {
    let time = new Date();
    let date = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
    return {
        subject,
        body,
        isRead: false,
        sentAt: date,
        isStar: false,
        id: utils.makeId()
    }
}

function setUnRead(id) {
    getById(id)
        .then(mail => {
            mail.isRead = false
            storageService.store(STORAGE_KEY, gMails)
        })



    return Promise.resolve()
}


function setRead(id) {
    getById(id)
        .then(mail => {
            mail.isRead = true
            storageService.store(STORAGE_KEY, gMails)

        })


    return Promise.resolve()
}

function setStar(id) {
    getById(id)
        .then(mail => {
            if (mail.isStar) mail.isStar = false
            else mail.isStar = true
            storageService.store(STORAGE_KEY, gMails)

        })
    return Promise.resolve()
}


function filterByStar(boolean, filterBy) {
    console.log('boolean is ', boolean)
    var mails = gMails
    mails = query(filterBy)
    if (boolean === true) mails = gMails.filter(mail => mail.isStar === boolean)



    return Promise.resolve(mails)

}

function save(mailToSave) {
    console.log('gmails', gMails)
    var savedMail = mailToSave;
    savedMail = _createMail(mailToSave.subject, mailToSave.body)
    gMails.push(savedMail)

    storageService.store(STORAGE_KEY, gMails)


    return Promise.resolve(savedMail)
}


function getById(id) {
    return Promise.resolve(gMails.find(mail => mail.id === id))
}

function query(filterBy) {
    var mails = gMails;
    console.log('fb', filterBy);

    if (filterBy) {
        var { words, isRead, notRead } = filterBy
        mails = gMails.filter(mail => (mail.subject.includes(words) || mail.body.includes(words)))
        if (isRead === true) mails = mails.filter(mail => mail.isRead === true)
        if (notRead === true) mails = mails.filter(mail => mail.isRead === false)

    }


    return Promise.resolve(mails);
}


function putRead(id) {
    var mail = gMails.find(mail => mail.id === id)
    mail.isRead = true
    storageService.store(STORAGE_KEY, gMails)
}

function remove(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId)
    gMails.splice(mailIdx, 1)

    storageService.store(STORAGE_KEY, gMails)
    return Promise.resolve();
}
