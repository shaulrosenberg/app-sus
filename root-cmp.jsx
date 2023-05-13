const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/app-header.jsx'
import { About } from './views/about.jsx'
import { Home } from './views/home.jsx'
import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { NoteIndex } from './apps/note/views/note-index.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { MailDetails } from './apps/mail/views/mail-details.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { BookIndex } from './apps/book/views/book-index.jsx'
import { BookAdd } from './apps/book/views/book-add.jsx'
import { BookDetails } from './apps/book/views/book-details.jsx'
import { BookEdit } from './apps/book/views/book-edit.jsx'

export function App() {
  return (
    <Router>
      <section className="app main-layout">
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mail" element={<MailIndex />}>
              <Route path=":mailId" element={<MailDetails />} />
            </Route>
            <Route path="/note" element={<NoteIndex />} />
            <Route path="/book" element={<BookIndex />}>
              <Route path="add" element={<BookAdd />} />
            </Route>
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
          </Routes>
        </main>
        <AppFooter />
      </section>
      <UserMsg />
    </Router>
  )
}
