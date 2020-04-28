import data from './data.js'

import Util from './util.js'
import storageService from './storageService.js'

//Keys Storage
const BOOKS_KEY = 'books'
const REVIEWS_KEY = 'reviews'

/* API */
const BOOKS_API = 'https://www.googleapis.com/books/v1/volumes?printType=books&q='

var gBooks;

export default {
    query,
    getById,
    addReview,
    getReviewsById,
    deleteBookReview,
    getBooksFromApi,
    addGoogleBook,
    getNextPrev
}


function query(filterBy = null) {
    if (!gBooks) gBooks = storageService.load(BOOKS_KEY, data)
    var books = gBooks

    if (filterBy) {
        var { title, maxPrice, minPrice } = filterBy
        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        books = gBooks.filter(book => book.title.includes(title)
            && (book.listPrice.amount < maxPrice)
            && (book.listPrice.amount > minPrice))
    }

    return Promise.resolve(books)
}

function getById(bookId) {
    if (!gBooks) query()
    const book = gBooks.find(book => book.id === bookId)
    return Promise.resolve(book)
}

function _getIdxBookById(idBook) {
    const idx = gBooks.findIndex(book => book.id === idBook)
    return (idx >= 0) ? idx : null
}

function addReview(review) {
    var reviews = storageService.load(REVIEWS_KEY, {})

    var data = {
        id: Date.now().toString(),
        name: review.name,
        date: review.date,
        review: review.review,
        rating: review.rating
    }

    if (!reviews[review.bookId]) reviews[review.bookId] = []
    reviews[review.bookId].unshift(data)
    storageService.store(REVIEWS_KEY, reviews)
}

function _loadBookReviews(idBook) {
    const reviews = storageService.load(REVIEWS_KEY, {})
    const bookReviews = reviews[idBook]

    return bookReviews ? bookReviews : []
}

function getReviewsById(idBook) {
    const reviews = _loadBookReviews(idBook)
    return Promise.resolve(reviews)
}

function deleteBookReview(idBook, idReview) {
    const reviews = storageService.load(REVIEWS_KEY, {})

    var bookReviews = _loadBookReviews(idBook)
    const reviewIdx = _getIdxBookReview(bookReviews, idReview)
    bookReviews.splice(reviewIdx, 1)

    reviews[idBook] = bookReviews

    storageService.store(REVIEWS_KEY, reviews)
}

function _getIdxBookReview(bookReviews, idReview) {
    const idxReview = bookReviews.find(review => review.id === idReview)
    return idxReview
}


/* BOOKS FROM GOOGLE-BOOKS API */

function getBooksFromApi(val) {
    return axios.get(BOOKS_API + val)
        .then(data => {
            if (!data) return Promise.reject('No data received')
            const items = data.data.items
            const books = items.map(item => _convertItemToBook(item))
            return books
        })
        .catch(ex => {
            console.log('Error at getBooksFromApi\n', ex)
            return Promise.reject('We are sorry, please try agin')
        })
}

function _convertItemToBook(item) {
    var book = {
        id: item.id || Data.now().toString(),
        title: item.volumeInfo.title || 'Not specified',
        subtitle: item.volumeInfo.subtitle || 'Not specified',
        authors: item.volumeInfo.authors || 'Not specified',
        publishedDate: item.volumeInfo.publishedDate.split('-')[0] || 'Not specified',
        description: item.volumeInfo.description || 'Not specified',
        pageCount: item.volumeInfo.pageCount || 'Not specified',
        categories: item.volumeInfo.categories || 'Not specified',
        thumbnail: item.volumeInfo.imageLinks.thumbnail || 'assets/img/book.jpg',
        language: "IL",
        listPrice: {
            amount: Util.getRandomInteger(15, 370),
            currencyCode: 'ILS',
            isOnSale: true
        }
    }
    return book
}

function addGoogleBook(book) {
    try {
        query()
        gBooks.unshift(book)
        storageService.store(BOOKS_KEY, gBooks)
        return true
    } catch (ex) {
        console.log('bookService.addGoogleBook is got error:\n', ex)
        return false
    }
}


/* NEXT-PREVIOUS PAGE */

function getNextPrev(idBook) {
    const idxCurrBook = _getIdxBookById(idBook)

    const nextId = (idxCurrBook < gBooks.length - 1) ? gBooks[idxCurrBook + 1].id : null
    const prevId = (idxCurrBook > 0) ? gBooks[idxCurrBook - 1].id : null
    const nextPrevIds = {
        next: nextId,
        prev: prevId
    }
    return nextPrevIds
}
