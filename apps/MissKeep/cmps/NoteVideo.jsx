

export default function NoteVideo(props) {
    const { info } = props

    return (
        <React.Fragment>
            <h2>{info.title}</h2>
            <video controls>
                <source src={info.url} />
            </video>
        </React.Fragment>
    )
}
