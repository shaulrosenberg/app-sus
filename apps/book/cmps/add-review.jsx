const { useState, useEffect } = React


export function AddReview({ onSubmit }) {
    const [fullname, setFullname] = useState('');
    const [rating, setRating] = useState(0);
    const [readAt, setReadAt] = useState(null)

    // const navigator = useNavigate()
    // const params = useParams()
    // // maybe??
    // const bookId = params.bookId

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = { fullname, rating, readAt };
        onSubmit(review);
        setFullname('');
        setRating(0);
        setReadAt(null);
    };

    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    return (
        <section className="book-review">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        required
                    >
                        <option value="">Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="readAt">Read Date:</label>
                    <input
                        type="date"
                        id="readAt"
                        value={readAt ? formatDate(readAt) : ''}
                        onChange={(e) => setReadAt(new Date(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Add Review</button>
            </form>
        </section>
    )
}