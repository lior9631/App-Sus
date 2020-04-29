
export function BookToAdd(props) {
    const { book, onAddBook } = props
    return (

        <li>
            <div className="book-to-add" >
                <div className="title-book-add">{book.title}</div> <button onClick={() => { onAddBook(book) }}>+</button>
            </div>
        </li>
    )
}
