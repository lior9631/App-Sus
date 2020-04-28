export function Description(props) {
    const { description, isLongTxtShown } = props
    return (
        <div className="description">
            <p>{description.substring(0, 100)}{(description.length > 100 && isLongTxtShown) ? '...' : description.substring(100)}</p>
        </div>
    )
}
