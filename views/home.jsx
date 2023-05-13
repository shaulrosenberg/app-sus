const { useNavigate } = ReactRouterDOM

export function Home() {
	const navigate = useNavigate()

	function onChangeRoute(route) {
		navigate(route)
	}

	return (
		<section className="home">
			<h1>Welcome to the Home page!</h1>
			<main className="hero-section">
				<h2>Explore and Manage</h2>
				<p>Discover the power of our applications</p>
			</main>

			<section className="features-section">
				<div onClick={() => onChangeRoute('/mail')}>
					<h3>Mail App</h3>
					<img src="./assets/img/mail-icon.png" alt="Mail Icon" />
					<p>Manage your emails with ease</p>
				</div>
				<div onClick={() => onChangeRoute('/note')}>
					<h3>Notes App</h3>
					<img src="./assets/img/note.png" alt="Notes Icon" />
					<p>Stay organized with notes and reminders</p>
				</div>
				<div onClick={() => onChangeRoute('/book')}>
					<h3>Books App</h3>
					<img src="./assets/img/book.png" alt="Books Icon" />
					<p>Discover and track your favorite books</p>
				</div>
			</section>
		</section>
	)
}
