import { useEffect, useState } from 'react';

type ValueType = string | number | boolean | object | null;

export default function useLocalStorage<T extends ValueType>(
	key: string
): { value: T | null; setValue: (value: T) => void } {
	const getInitialValue = (): T | null => {
		try {
			const storedValue = window.localStorage.getItem(key);
			if (storedValue !== null) {
				return JSON.parse(storedValue) as T;
			}
		} catch (error) {
			console.log(error);
		}
		return null;
	};
	const [storedValue, setStoredValue] = useState<T | null>(getInitialValue());
	const setValue = (value: T) => {
		try {
			if (window !== undefined) {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const initial = getInitialValue();
		if (initial !== storedValue) {
			setStoredValue(initial);
		}
	}, []);

	return { value: storedValue, setValue };
}
