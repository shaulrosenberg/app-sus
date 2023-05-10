const { useState } = React


export function LongTxt({ txt, length = 100 }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleIsExpanded = (ev) => {
		ev.stopPropagation()
		setIsExpanded(!isExpanded)
	}

	const truncatedTxt = txt.slice(0, length)
	const displayTxt = isExpanded ? txt : truncatedTxt + '...'
	const btnText = isExpanded ? 'Read less' : 'Read more'

	return (
		<div>
			<p>{displayTxt}</p>
			{/* {txt.length > length && (
				<button onClick={toggleIsExpanded}>{btnText}</button>
			)} */}
		</div>
	)
}