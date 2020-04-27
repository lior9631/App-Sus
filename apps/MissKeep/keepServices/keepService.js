import Utils from '../../../services/utils.js'
import StorageService from '../../../services/storageService.js'


const NOTES_KEY = 'notes'

var gNotes = [
    {
        id: Utils.makeId(12),
        type: "NoteText",
        isPinned: false,
        info: {
            title: 'My Text',
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: Utils.makeId(12),
        type: "NoteImg",
        isPinned: true,
        info: {
            title: 'My Image',
            url: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            txt: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: Utils.makeId(12),
        type: "NoteTodos",
        isPinned: false,
        info: {
            title: 'Todod',
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        }
    }
]


export default {
    query,
    addNote,
    pinNote,
    getPintNotes
}


function query(filterBy = null) {
    gNotes = StorageService.load(NOTES_KEY, gNotes)
    var notes = gNotes

    if (filterBy) notes = filter(filterBy)
    notes = sortByPinNotes(notes)

    if (notes) return Promise.resolve(notes)
    return Promise.reject('Error')
}


function sortByPinNotes(notes) {
    return notes.sort(note => {
        return note.isPinned ? -1 : 1
    })
}

function filter({ input, type }) {
    var input = input.toLowerCase()
    return gNotes.filter(note => {
        var title = note.info.title.toLowerCase()
        return (title.includes(input)) && ((type === 'all') ? true : note.type === type)
    })
}

function addNote(note) {
    note.id = Utils.makeId(12)
    gNotes.unshift(note)
    StorageService.store(NOTES_KEY, gNotes)
}

function pinNote(idNote) {
    const noteIdx = getNoteIdxById(idNote)

    const isPinned = gNotes[noteIdx].isPinned
    gNotes[noteIdx].isPinned = !isPinned

    StorageService.store(NOTES_KEY, gNotes)
}


function getNoteById(idNote) {
    return gNotes.find(note => note.id === idNote)
}

function getNoteIdxById(idNote) {
    return gNotes.findIndex(note => note.id === idNote)
}

function getPintNotes() {
    const pinNotes = gNotes.filter(note => note.isPinned)
    return pinNotes ? Promise.resolve(pinNotes) : Promise.reject('getPinNotes say: get pin-notes failed')
}
