import { useEffect, useState } from 'react';

export const useClient = () => {
	const [isClient, setIsClinet] = useState(false);
	useEffect(() => {
		setIsClinet(true);
	}, []);
	return { isClient };
};
