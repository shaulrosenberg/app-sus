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

    const { txt } = filterByToEdit

    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title:</label>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="By Title" />

                <button>🔍</button>
            </form>
        </section>
    )
}