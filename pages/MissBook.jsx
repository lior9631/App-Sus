import booksService from "../apps/MissBook/services/booksService.js";




import { BookList } from "../apps/MissBook/cmps/book-list.jsx";
import { BooksFilter } from "../apps/MissBook/cmps/book-filter.jsx";

export default class MissBook extends React.Component {

  state = {
    books: null,
    filterBy: null,
  };

  componentDidMount() {
    this.loadBooks()
  }

  loadBooks = () => {
    booksService.query(this.state.filterBy)
      .then(books => {
        this.setState({ books });
      });
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.loadBooks());
  };

  render() {
    const { books, filterBy } = this.state
    return (
      <section>
        <BooksFilter filterBy={filterBy} onSetFilter={this.onSetFilter} />
        {books && <BookList books={books} />}
      </section>
    );
  }
}
