const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js";
import { showErrorMsg } from "../services/event-bus.service.js"


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Had issued in book edit:', err);
                navigate('/book')
                showErrorMsg('Book not found!')
            })
    }


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value

        if (field === 'amount' || field === 'isOnSale') {
            // TODO: handle checkbox checked = 'true/false'
            setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }))
        }
        else if (field === 'authors' || field === 'categories') {
            const values = value.split(',')
            setBookToEdit(prevBook => ({ ...prevBook, [field]: values }))
        }
        else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
            })
    }


    // TODO: add a book properly, to not screw up the DB and rendering of the list
    const { title, description, publishedDate, pageCount, thumbnail, authors, categories } = bookToEdit
    const { amount, isOnSale } = bookToEdit.listPrice

    return (
        <section className="book-edit">
            <h2>{bookToEdit.id ? 'Edit' : 'Add'} Book</h2>

            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">Price:</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />

                <label htmlFor="publishedDate">publishedDate:</label>
                <input onChange={handleChange} value={publishedDate} type="number" name="publishedDate" id="publishedDate" />

                <label htmlFor="pageCount">pageCount:</label>
                <input onChange={handleChange} value={pageCount} type="number" name="pageCount" id="pageCount" />

                <label htmlFor="desc">description:</label>
                <input onChange={handleChange} value={description} type="text" name="description" id="desc" />

                <label htmlFor="onSale">on sale:</label>
                <input onChange={handleChange} value={isOnSale} type="checkbox" name="IsOnSale" id="IsOnSale" />

                <label htmlFor="authors">authors:</label>
                <input onChange={handleChange} value={authors} type="text" name="authors" id="authors" />

                <label htmlFor="categories">categories:</label>
                <input onChange={handleChange} value={categories} type="text" name="categories" id="categories" />

                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
            </form>

        </section>
    )

}