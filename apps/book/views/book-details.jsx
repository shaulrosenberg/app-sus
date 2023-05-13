import { LongTxt } from "../cmps/long-txt.jsx"
import { AddReview } from "../cmps/add-review.jsx"
import { ReviewList } from "../cmps/review-list.jsx"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"


const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM


export function BookDetails() {

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)

    const { bookId } = useParams()
    const navigate = useNavigate()
    const params = useParams()



    useEffect(() => {
        loadBook()
        loadNextBookId()
    }, [bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issued in book details:', err);
                navigate('/book')
            })
    }

    function loadNextBookId() {
        bookService.getNextBookId(bookId)
            .then(setNextBookId)
    }

    function onAddReview(review) {
        // call book service to add review, bookId is of book.id
        if (!review.id) review.id = utilService.makeId()
        bookService.addReview(book.id, review)
            .then(setBook)
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(setBook)
    }

    function getColorClass() {
        let colorClass = ''
        if (book.listPrice.amount < 20) colorClass = 'green'
        else if (book.listPrice.amount > 150) colorClass = 'red'
    }

    function getYearDiff(pastDate = book.publishedDate) {
        const today = new Date()
        return today.getFullYear() - pastDate
    }

    function onBack() {
        navigate('/book')
    }


    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <div className="book-img">
                <img src={book.thumbnail} alt="" />
                {book.listPrice.isOnSale && <h2 className="sale-icon">ON SALE</h2>}
            </div>

            {book.pageCount > 500 && <h5>Pages: {book.pageCount}(Serious Reading)</h5>}
            {book.pageCount > 200 && book.pageCount <= 500 && <h5>Pages: {book.pageCount}(Decent Reading)</h5>}
            {book.pageCount < 100 && <h5>Pages: {book.pageCount}(Light Reading)</h5>}
            {getYearDiff() > 10 && (<h5>published: {book.publishedDate}(Vintage)</h5>)}
            {getYearDiff() <= 1 && (<h5>published: {book.publishedDate}(New)</h5>)}
            <h5 className={getColorClass()}>Price: {book.listPrice.amount}</h5>
            <LongTxt txt={book.description || 'no description'} length={100} />
            <button onClick={onBack}>Back</button>
            <ReviewList reviews={book.reviews || []} onRemoveReview={onRemoveReview} />
            <AddReview onSubmit={onAddReview} />
            <div className="book-details-nav">
                {/* <Link to={`/book/${prevBookId}`}>Previous book</Link> */}
                <Link to={`/book/${nextBookId}`}>Next book</Link>
            </div>
        </section>
    )

}