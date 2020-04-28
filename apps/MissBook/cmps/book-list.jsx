import { BookPreview } from '../cmps/book-preview.jsx'

export function BookList(props) {
  const { books } = props
  return (
    <section>
      <section className="books-list">
        {books.map(book => <BookPreview key={book.id} book={book}/>)}
      </section>
    </section>
  )
}
