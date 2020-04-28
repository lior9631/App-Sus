const { Link } = ReactRouterDOM

import BookService from '../services/booksService.js'

import { Description } from '../cmps/description.jsx'
import { ReviewAdd } from '../cmps/review-add.jsx'
import { BookReviews } from '../cmps/book-reviews.jsx'

export class BookDetails extends React.Component {
    state = {
        reviews: null,
        book: null,
        isLongTxtShown: true,
        prevNext: {}

    }
    componentDidMount() {
        this.loadBook()
        this.prevNextIds()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.idBook !== this.props.match.params.idBook) {
            this.loadBook();
            this.prevNextIds()
        }
    }

    loadReviews = () => {
        const idBook = this.props.match.params.idBook
        BookService.getReviewsById(idBook)
            .then(reviews => {
                this.setState({ reviews })
            })
    }

    loadBook() {
        const idBook = this.props.match.params.idBook

        BookService.getById(idBook)
            .then(book => {
                this.setState({ book })
            })
        this.loadReviews()
    }

    onDescBtn = () => {
        this.setState(prevState => ({ isLongTxtShown: !prevState.isLongTxtShown }))
    }

    onDeleteReview = (reviewID) => {
        BookService.deleteBookReview(this.props.match.params.idBook, reviewID)
        this.loadReviews()
    }
    prevNextIds = () => {
        const idBook = this.props.match.params.idBook
        const prevNext = BookService.getNextPrev(idBook)
        this.setState({ prevNext })
    }

    get ColorTxt() {
        const book = this.state.book
        const price = book.listPrice.amount

        if (price < 20) {
            return 'green'
        } else if (price > 150) {
            return 'red'
        } else return ''
    }

    get publishedYears() {
        const book = this.state.book
        const years = new Date().getFullYear() - book.publishedDate

        if (years < 1) {
            return 'New!'
        } else if (years > 10) {
            return ' Veteran Book'
        } else return ''
    }

    get readLen() {
        const book = this.state.book
        const pageCount = book.pageCount

        if (pageCount > 500) {
            return '(Long reading)'
        } else if (pageCount > 200) {
            return '(Decent Reading)'
        } else if (pageCount < 100) {
            return '(Light Reading)'
        } else return ''
    }

    render() {
        const { book, reviews, prevNext } = this.state;
        const disabledStyle = {
            color: 'gray',
            textDecoration: 'none',
            cursor: 'default'
        };

        return (
            <section className="details-book-container">
                <h1>Detalis book</h1>
                {!book ? 'Loding data..' :
                    < React.Fragment >
                        <article className="book-details">

                            <img src={book.thumbnail} alt={book.title} />

                            <div className="content">
                                <h1>{book.title}</h1>
                                <h2>
                                    <span className="title">
                                        {(book.authors.length > 1) ? 'Authors' : 'Author'}:
                                        </span>
                                    {book.authors.join(', ')}
                                </h2>
                                <h3>
                                    <span className="title">
                                        {(book.categories.length > 1) ? 'Categories' : 'Category'}:
                                        </span>
                                    {book.categories.join(', ')}
                                </h3>
                                <div className="detail">
                                    <p className="title">Published date: </p>
                                    <p>{book.publishedDate} <span className="bold red">{this.publishedYears}</span></p>
                                </div>
                                <div className='price detail'>
                                    <p className='title'>Price: </p>
                                    <p className={this.ColorTxt}>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
                                </div>
                                <div className="detail">
                                    <p className="title">Page count: </p>
                                    <p>{book.pageCount} <span className="bold"></span>{this.readLen}</p>
                                </div>
                            </div>

                            <div className="description">
                                <Description description={book.description} isLongTxtShown={this.state.isLongTxtShown} />
                                {book.description.length > 100 && <button onClick={this.onDescBtn}>{this.state.isLongTxtShown ? 'More' : 'Less'}</button>}
                            </div>
                            <hr />
                            <div>
                                <Link to={`${'/books/' + ((prevNext.next) ? prevNext.next : book.id)}`} style={!prevNext.next ? disabledStyle : null}>NEXT-BOOK</Link>
                                <span> | </span>
                                <Link to={`${'/books/' + ((prevNext.prev) ? prevNext.prev : book.id)}`} style={!prevNext.prev ? disabledStyle : null}>PREVIOUS-BOOK</Link>
                            </div>
                        </article>

                        <article>
                            <ReviewAdd bookId={book.id} loadReviews={this.loadReviews} />
                        </article>

                        <section className="posts-container">
                            <h1>What other people think about this book</h1>
                            {reviews ? <BookReviews reviews={reviews} onDeleteReview={this.onDeleteReview} /> : 'There are no posts for this book'}
                        </section>

                    </React.Fragment>
                }
            </section>
        )
    }
}
