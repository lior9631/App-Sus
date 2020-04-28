

export default function NoteVideo(props) {
    const { info } = props

    return (
        <React.Fragment>
            <h2>{info.title}</h2>
            <video controls>
                <source src={info.url} />
            </video>
            {/* <iframe
                src={info.url} frameborder="0" allow="accelerometer">
            </iframe> */}
        </React.Fragment>
    )
}
