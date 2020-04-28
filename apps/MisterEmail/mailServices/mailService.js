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
    setRead,
    bringAllMails,
    sendToTrash,
    filterByTrash
}

const gDefaultMails = [_createMail('nevo', 'facebook', 'shahar peretz'), _createMail('gil', 'instagram', 'alo dai'), _createMail('shahar', 'twiter', 'lior ganel'), _createMail('alon', 'linkedin', 'yaronBiton')]

var gMails = null

_createMails()






function _createMails() {
    gMails = storageService.load(STORAGE_KEY, gDefaultMails)
    storageService.store(STORAGE_KEY, gMails)
    if (!gMails.length) gMails = [_createMail('nevo', 'facebook', 'shahar peretz'), _createMail('gil', 'instagram', 'alo dai'), _createMail('shahar', 'twiter', 'lior ganel'), _createMail('alon', 'linkedin', 'yaronBiton')]

}

function _createMail(delivery, subject, body) {
    let time = new Date();
    let date = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
    return {
        delivery,
        subject,
        body,
        isRead: false,
        sentAt: date,
        isStar: false,
        isDelete: false,
        isSent: false,
        id: utils.makeId()
    }
}


function bringAllMails() {
    var mails = gMails
    mails = mails.filter(mail => mail.isDelete === false)
    return Promise.resolve(mails)

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


function sendToTrash(id) {
    getById(id)
        .then(mail => {
            if(!mail.isDelete) {
                mail.isDelete = true
                storageService.store(STORAGE_KEY, gMails)
                
            }else remove(mail.id)
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




function save(mailToSave) {
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
    mails = mails.filter(mail => mail.isDelete === false)
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




function filterByStar() {
    let mails = gMails;
    mails = mails.filter(mail => mail.isDelete === false)
    console.log('firstFilter' , mails)
    
    mails = mails.filter(mail => mail.isStar === true)
    console.log('second' , mails)
    return Promise.resolve(mails)
}

function filterByTrash() {
    let mails = gMails;
    console.log('before filter' , mails)
    mails = mails.filter(mail => mail.isDelete === true)
    console.log('after filter' , mails)
    
    return Promise.resolve(mails)
}