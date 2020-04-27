import NoteTxt from './NoteTxt.jsx'
import NoteImg from './NoteImg.jsx'
import NoteTodos from './NoteTodos.jsx'
import NoteVideo from './NoteVideo.jsx'


export default function NoteContent(props) {
    const { type, info } = props
    switch (type) {
        case 'NoteText':
            return (
                <NoteTxt info={info} />
            )
        case 'NoteImg':
            return (
                <NoteImg info={info} />
            )
        case 'NoteTodos':
            return (
                <NoteTodos info={info} />
            )
        case 'NoteVideo':
            return (
                <NoteVideo info={info} />
            )
    }
    return <p>Error</p>
}
