import Utils from '../../../services/utils.js'
import StorageService from '../../../services/storageService.js'


const NOTES_KEY = 'notes'

var gNotes = [
    {
        id: Utils.makeId(12),
        type: "NoteText",
        isPinned: false,
        info: {
            title: 'What!!!!!!!',
            txt: "rem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet justo non eros pharetra gravida. Nam tincidunt, mauris sed tempus pretium, turpis nunc ultricies quam"
        },
        style: {
            backgroundColor: "#cbf0f8"
        }
    },
    {
        id: Utils.makeId(12),
        type: "NoteImg",
        isPinned: true,
        info: {
            title: 'The Sunset',
            url: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        },
        style: {
            backgroundColor: "#aecbfa"
        }
    },
    {
        id: Utils.makeId(12),
        type: "NoteImg",
        isPinned: true,
        info: {
            title: 'Hello friend',
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJWgWnhcfvd4uWmRZXtVwh4Lgam1_9qp-ZSd6UG7HU0Ol5biVX&usqp=CAU",
        },
        style: {
            backgroundColor: "#ccff90"
        }
    },
    {
        id: Utils.makeId(12),
        type: "NoteTodos",
        isPinned: false,
        info: {
            title: 'What i need to do',
            todos: [
                { txt: "Buy milk" },
                { txt: "To do sprint" },
                { txt: "Go to sleep" }
            ]
        },
        style: {
            backgroundColor: "#fff475"
        }
    }
]


export default {
    query,
    addNote,
    pinNote,
    getPintNotes,
    deleteNote,
    getNoteById
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

function deleteNote(idNote) {
    const noteIdx = getNoteIdxById(idNote)
    gNotes.splice(noteIdx, 1)
    StorageService.store(NOTES_KEY, gNotes)
}

function getNoteById(idNote) {
    const note = gNotes.find(note => note.id === idNote)
    return note ? Promise.resolve(note) : Promise.reject('Note not available')
}

function getNoteIdxById(idNote) {
    return gNotes.findIndex(note => note.id === idNote)
}

function getPintNotes() {
    const pinNotes = gNotes.filter(note => note.isPinned)
    return pinNotes ? Promise.resolve(pinNotes) : Promise.reject('getPinNotes say: get pin-notes failed')
}
