import { Button } from '@chakra-ui/react';
import { useProductDitails } from '~/store/useProductDitails';

export default function ProductDitailsSizeBtn({ value }: { value: string }) {
	const [size, set, warn] = useProductDitails((state) => [
		state.size,
		state.setSize,
		state.warn,
	]);
	return (
		<Button
			size={['xs', 'sm']}
			isActive={value === size}
			onClick={() => set(value)}
			transition="border .5s ease-in-out"
			border={warn ? '.5px solid' : undefined}
			borderColor={warn ? 'orange.400' : undefined}
		>
			{value}
		</Button>
	);
}
