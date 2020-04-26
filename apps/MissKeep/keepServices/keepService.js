import UtilService from '../../../services/utilService.js'

const NOTES_KEY = 'notes'

var gNotes = [
    {
        id: UtilService.makeId(),
        type: "NoteText",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: UtilService.makeId(),
        type: "NoteImg",
        info: {
            url: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: UtilService.makeId(),
        type: "NoteTodos",
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        }
    }
]


export default {
    query
}


function query(filterBy = null) {
    // if (!gNotes) gNotes = storageService.load(NOTES_KEY, gNotes)
    // var notes = gNote
    if (filterBy) {

    }
    if (gNotes) return Promise.resolve(gNotes)
    return Promise.reject('Error')
}
