import NoteContent from './NoteContent.jsx'

export default class Note extends React.Component {

    render() {
        const { id, type, isPinned, info, style } = this.props.note
        return (
            <article>
                <NoteContent type={type} info={info} key={id} />
            </article>
        )
    }
} 
