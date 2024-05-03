export function handlScroll(id: string) {
	const el = document.getElementById(id);
	if (el) {
		el.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
		});
	}
}
