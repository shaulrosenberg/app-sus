const { useState, useEffect, useRef } = React
const {useNavigate} = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookAdd() {
    const [searchTxt, setSearchTxt] = useState('')
    const [books, setBooks] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {


        return () => {

        }
    }, [])

    useEffect(() => {
        loadBooks()

    }, [searchTxt])

    function handleChange(ev) {
        const txt = ev.target.value
        console.log(txt)
        setSearchTxt(txt)
    }

    function loadBooks() {
        if (!searchTxt) return

        googleBookService.query(searchTxt)
            .then(setBooks)
            .catch(err => console.log(err))
        // bookService.query({ txt: searchTxt })
        //     .then(setBooks)
    }

    const debouncedHandleChange = utilService.debounce(handleChange, 500)

    function onAddBook(bookId) {
        const book = books.find(book => book.id === bookId)
        // bookService.addGoogleBook(book)
        bookService.addGoogleBook(book)
        showSuccessMsg(`book ID: ${bookId} was added!`)
        navigate('/book')
    }

    return (
        <section className="google-book">
            <input type="search" placeholder="search book" onChange={debouncedHandleChange} />
            <ul>
                {books && books.map(book =>
                    <li key={book.id}>
                        <span>{book.title}</span>
                        <button onClick={() => onAddBook(book.id)}>+</button>
                    </li>
                )}
            </ul>
        </section>
    )
}