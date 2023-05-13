import { utilService } from "../../../services/util.service.js"

const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    // doesn't work for some reason
    const debouncedHandleChange = utilService.debounce(handleChange, 300)

    const { txt } = filterByToEdit

    return (
        <section className="mail-filter">
            {/* <button className="mail-hamburger"></button> */}
            <form onSubmit={onSubmitFilter}>
                <div className="search-container">
                    <input className="search-input" value={txt} onChange={handleChange} name="txt" type="text" placeholder="Search mail" />
                    <div className="search-icon"></div>
                </div>
            </form>
        </section>
    )
}