import { ReviewItem } from "./review-item.jsx"

// send onDeleteReview to this component
export function ReviewList({ reviews, onRemoveReview }) {
    if(!reviews.length) return <h3>No reviews yet!</h3>

    return (
        <ul className="reviews-list">
            {reviews.map(review => (
                <li key={review.id} className="review-item">
                    <h3>{review.fullname}</h3>
                    <div>Rating: {review.rating}</div>
                    <div>Read Date: {review.readAt.toLocaleString()}</div>
                    <button onClick={() => onRemoveReview(review.id)} className="review-delete-btn">Delete Review</button>
                </li>
            ))}
        </ul>
    )
}