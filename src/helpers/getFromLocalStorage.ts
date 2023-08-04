function getFromLocalStorage<T>(key: string): T | null {
	if (typeof window !== 'undefined' && window.localStorage) {
		const cartJSON = window.localStorage.getItem(key);
		if (cartJSON) {
			return JSON.parse(cartJSON) as T;
		}
	}
	return null;
}

function saveToLocalStorage<T>(thing: T, key: string): void {
	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(key, JSON.stringify(thing));
	}
}

export { getFromLocalStorage, saveToLocalStorage };
