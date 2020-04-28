const { Link } = ReactRouterDOM

export class BookPreview extends React.Component {

  render() {
    const { book } = this.props
    return (
      // <article className="book" onClick={() => onSelectBook(book)}>
      <Link className="link book" to={'/books/' + book.id}>
        <h2> {book.title} </h2>
        <h3>By: {book.authors.join(', ')}</h3>
        <img src={book.thumbnail}></img>
        <p>Price: {book.listPrice.amount}{book.listPrice.currencyCode}</p>
      </Link>
    )

  }
}

