import { Review } from '../cmps/review.jsx'

export function BookReviews(props) {

    const { reviews, onDeleteReview } = props
    return (
        reviews.map((review, idx) => <Review review={review} onDeleteReview={onDeleteReview} key={idx} />)
    )
}
