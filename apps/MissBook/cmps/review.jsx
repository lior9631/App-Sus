export function Review(props) {
    const { review, onDeleteReview } = props
    return (
        <article className="post">
            <header className="post-header">
                <div className="btn-post-container">
                    <button onClick={() => onDeleteReview(review.reviewId)}>X</button>
                </div>

                <div className="title">
                    <p>Posted by: {review.name}</p>
                    <p>Read at: {review.date}</p>
                </div>
                <p className="rating">Rating: {review.rating}</p>
            </header>
            <main>
                <p>{review.review}</p>
            </main>
        </ article>
    )


}
