import { Stack, Text } from '@chakra-ui/react';

type TotalSumProps = {
	sum: number;
};

const TotalSum = ({ sum }: TotalSumProps) => {
	return (
		<Stack
			w={[null, '100%']}
			fontWeight={600}
			fontSize={['md', '2xl']}
			direction="row"
			justifyContent="space-between"
		>
			<Text>Итог:</Text>
			<Text>{sum} ₽</Text>
		</Stack>
	);
};

export default TotalSum;
