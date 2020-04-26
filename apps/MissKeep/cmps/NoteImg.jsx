
export default function NoteImg(props) {
    const { info } = props
    return (
        <React.Fragment>
            <h2>{info.title}</h2>
            <img src={info.url} />
            <p>{info.txt}</p>
        </React.Fragment>
    )
}
