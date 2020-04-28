import BookService from '../services/booksService.js'

export class ReviewAdd extends React.Component {

    state = {
        fromRev: {
            bookId: this.props.bookId,
            name: 'Books Reader',
            date: new Date().toISOString().split('T')[0],
            review: '',
            rating: '1'
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({
            fromRev: { ...prevState.fromRev, [field]: value }
        }), () => {
        })
    }

    onPost = (ev) => {
        ev.preventDefault()

        const post = this.state.fromRev
        BookService.addReview(post)
        this.props.loadReviews(this.props.bookId)
    }

    render() {
        const { name, date, review, rating } = this.state.fromRev
        return (
            <section className="form-container">
                <h2>Write what you think about this book</h2>
                <form onSubmit={this.onPost} className="review-form">
                    <div>
                        <label>Full name:</label>
                        <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Full name" autoFocus required />
                    </div>
                    <div>
                        <label>Read at</label>
                        <input type="date" name="date" value={date} onChange={this.handleChange} required />
                    </div>
                    <div>
                        <label>Rating:</label>
                        <select value={rating} name="rating" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <textarea name="review" value={review} onChange={this.handleChange} placeholder="What do you think about this book?" rows="5" required></textarea>
                    <button>Post</button>
                </form>
            </section >
        )
    }
}
