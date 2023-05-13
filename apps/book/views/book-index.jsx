const { Link, Outlet } = ReactRouterDOM
const { useEffect, useState } = React

import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './book-details.jsx'

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then(books => setBooks(books))
    // bookService.query().then(setBooks)
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      const updatedBooks = books.filter(book => book.id !== bookId)
      setBooks(updatedBooks)
      showSuccessMsg(`Book (${bookId}) removed!`)
    })
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
  }

  console.log('render')
  return (
    <section className="book-layout">
      {' '}
      <section className="book-index">
        <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <Link to="/book/add" className="index-link">
          Add Google Book
        </Link>
        <Outlet />
        <Link to="/book/edit" className="index-link">
          Add Book
        </Link>
        <BookList books={books} onRemoveBook={onRemoveBook} />
      </section>
    </section>
  )
}
