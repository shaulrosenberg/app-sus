const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { AppFooter } from "./cmps/app-footer.jsx"



export function App() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <main className="main-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/note" element={<NoteIndex />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </section>
        <UserMsg />
    </Router>
}
