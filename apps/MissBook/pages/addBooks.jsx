import BookService from '../services/booksService.js'
import { eventBus } from '../../../services/eventBusService.js'

import { BookToAdd } from '../cmps/book-to-add.jsx'

export class AddBooks extends React.Component {

    state = {
        inputSearch: "",
        books: null
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value
        this.setState({ [field]: value })

    }

    onSearch = (ev) => {
        ev.preventDefault()
        BookService.getBooksFromApi(this.state.inputSearch)
            .then(books => {
                this.setState({ books })
            })
            .catch(ex => {
                eventBus.emit('userMsg', {
                    txt: ex,
                    isMsgSuccess: false
                })
            })
    }

    onAddBook(book) {
        const msgSuccess = 'Your book has been successfully added to the library';
        const msgError = 'We are sorry but there was a system error, please try again';

        const isMsgSuccess = BookService.addGoogleBook(book)
        const txt = isMsgSuccess ? msgSuccess : msgError

        eventBus.emit('userMsg', {
            txt,
            isMsgSuccess,
            bookLink: `books/${book.id}`
        })
    }

    render() {
        const { inputSearch, books } = this.state
        return (
            <main className="container-add-book">
                <form onSubmit={this.onSearch} className="form-add-book">
                    <input type="text" name="inputSearch" value={inputSearch} onChange={this.handleChange} placeholder="Enter book name" />
                    <button className="btn-form-add-book">Search</button>
                </form>

                <section className="books-add-list">
                    {books &&
                        <ul>
                            {books.map(book => <BookToAdd key={book.id} book={book} onAddBook={this.onAddBook} />)}
                        </ul>
                    }
                </section>
            </main>
        )
    }
}
