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
    filterByTrash,
    filterBySent
}

const gDefaultMails = [
    _createMail('Nevo', 'facebook', 'nevo added you as a friend please subscribe'),
    _createMail('ash Katchamp', 'Pokemon', 'ash tafas et pikachu teasher lo halvaa kedey lasim to ba mahon' ,true),
    _createMail('shahar', 'Nivharta', 'ata meleh ha coding academy teasher et hagaatha letekes halukat ha prasim'),
    _createMail('Lior', 'congratiulations', 'please accept that you survive shahar for 3 days' , false , true),
    _createMail('Hila', 'Arrive', 'please accept to MIFAL HA PAIS ! zahit be 1,000,000$'),
    _createMail('Abir', 'bLuR', 'box-shadoowww 100242902490 for your next proj'),
    _createMail('marko', 'ima', 'please found me'),
    _createMail('Pinokio', 'saba jebeto ', 'the woods price are low . please come to pick your arms' , true , false),
    _createMail('Shilgiya', 'GAMAD', 'sorry i peed at your garden'),
    _createMail('Kipa aduma', 'ZEEV', 'i was hungry so i ate your grandma'),
    _createMail('ADAM', 'apple', 'DONOT ever ate them!!'),
    _createMail('stich', 'Instagram', 'stich just follow your please subscribe'),
    _createMail('Shrek', 'alone', 'im alone my friend fiyona just left me.. please connect to zoom '),

]





var gMails = null

_createMails()






function _createMails() {
    gMails = storageService.load(STORAGE_KEY, gDefaultMails)
    storageService.store(STORAGE_KEY, gMails)
    if (!gMails.length) gMails = [_createMail('nevo', 'facebook', 'shahar peretz'), _createMail('gil', 'instagram', 'alo dai'), _createMail('shahar', 'twiter', 'lior ganel'), _createMail('alon', 'linkedin', 'yaronBiton')]

}

function _createMail(delivery, subject, body, isRead = false , isSent=false, isStar=false) {
    let time = new Date();
    let date = `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
    return {
        delivery,
        subject,
        body,
        isRead,
        sentAt: date,
        isStar,
        isDelete: false,
        isSent,
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
            if (!mail.isDelete) {
                mail.isDelete = true
                storageService.store(STORAGE_KEY, gMails)

            } else remove(mail.id)
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
   

    savedMail = _createMail(mailToSave.from, mailToSave.subject, mailToSave.body , false , true)
    gMails.push(savedMail)

    storageService.store(STORAGE_KEY, gMails)


    return Promise.resolve(savedMail)
}


function getById(id) {
    return Promise.resolve(gMails.find(mail => mail.id === id))
}

function query(filterBy) {
    
    var mails = gMails.filter(mail => !mail.isDelete)
    if (filterBy) {
        var { words, isRead, notRead } = filterBy
        mails = mails.filter(mail => (mail.subject.includes(words) || mail.body.includes(words)))

        if (isRead === true) mails = mails.filter(mail => mail.isRead)
        if (notRead === true) mails = mails.filter(mail => !mail.isRead)

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

    mails = mails.filter(mail => mail.isStar === true)
    return Promise.resolve(mails)
}

function filterByTrash() {
    let mails = gMails;
    mails = mails.filter(mail => mail.isDelete === true)

    return Promise.resolve(mails)
}

function filterBySent(){
    let mails = gMails;
    mails = mails.filter(mail => !mail.isDelete) 
    mails = mails.filter(mail => mail.isSent)
    return Promise.resolve(mails)

}