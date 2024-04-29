import { Button } from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';
type SizeButtonProps = {
	value: string;
};

const SizeButton = ({ value }: SizeButtonProps) => {
	const set = useCreateProduct((state) => state.setSize);
	const sizes = useCreateProduct((state) => state.size);
	return (
		<Button
			onClick={() => set(value)}
			size="sm"
			isActive={sizes.includes(value)}
		>
			{value}
		</Button>
	);
};

export default SizeButton;
