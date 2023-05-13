


export function ReviewItem({ review }) {
    return (
        <li className="review-item">
            <h3>{review.fullname}</h3>
            <div>Rating: {review.rating}</div>
            <div>Read Date: {review.readAt.toLocaleDateString()}</div>
        </li>
    )
}