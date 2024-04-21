import { Button } from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';
type SizeButtonProps = {
	value: string;
};

const SizeButton = ({ value }: SizeButtonProps) => {
	const set = useCreateProduct((state) => state.setSize);
	return (
		<Button onClick={() => set(value)} size="sm">
			{value}
		</Button>
	);
};

export default SizeButton;
