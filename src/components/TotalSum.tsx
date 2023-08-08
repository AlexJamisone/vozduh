import { Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type TotalSumProps = {
	sum: number;
};

const TotalSum = ({ sum }: TotalSumProps) => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		<Stack
			w={[null, '100%']}
			fontWeight={600}
			fontSize={['md', '2xl']}
			direction="row"
			justifyContent="space-between"
		>
			<Text>Итог:</Text>
			{isClient && <Text>{sum.toString()} ₽</Text>}
		</Stack>
	);
};

export default TotalSum;
