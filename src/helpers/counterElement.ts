export function counterElement(
	content: number,
	position?: { bottom: number; right: number }
) {
	return {
		_before: {
			content: `'${content}'`,
			width: content === 0 ? '0px' : '20px',
			height: content === 0 ? '0px' : '20px',
			position: 'absolute',
			bottom: position?.bottom ?? -5,
			right: position?.right ?? -5,
			border: '1px solid',
			p: content === 0 ? 0 : 0.5,
			rounded: 'full',
			textAlign: 'center',
			opacity: content === 0 || !content ? 0 : 1,
			transition: 'opacity .7s ease-in-out',
		},
	};
}
