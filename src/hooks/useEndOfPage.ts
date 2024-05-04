import { useEffect, useState } from 'react';

export default function useEndOfPage() {
	const [isEndOfPage, setIsEndOfPage] = useState(false);

	useEffect(() => {
		function handleScroll() {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop =
				window.scrollY || document.documentElement.scrollTop;

			if (windowHeight + scrollTop >= documentHeight) {
				setIsEndOfPage(true);
			} else {
				setIsEndOfPage(false);
			}
		}

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return isEndOfPage;
}
