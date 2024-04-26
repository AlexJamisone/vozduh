import { Button, useToast } from '@chakra-ui/react';
import { useAddress } from '~/store/useAddress';
import { useCart } from '~/store/useCart';
import { api } from '~/utils/api';
const OrderAction = () => {
	const { mutate: create, isLoading } = api.order.create.useMutation({
		onSuccess: () => {},
		onError: ({ data, message }) => {
			if (data?.zodError) {
				setError({ isError: true, path: data.zodError });
				return;
			}
			toast({ description: message, status: 'error' });
		},
	});
	const [total, items, clear] = useCart((state) => [
		state.total,
		state.items,
		state.clear,
	]);
	const [input, id, ctrl, setError] = useAddress((state) => [
		state.input,
		state.edit.id,
		state.controller,
		state.setError,
	]);
	const ctx = api.useContext();
	const toast = useToast();
	function handlAction() {
		if (!id && !ctrl.isSelected) {
			toast({
				description: 'Потверди пункт выдачи',
				status: 'warning',
			});
			return;
		}
		const { contactPhone, lastName, firstName, comment } = input;
		create({
			id,
			lastName,
			firstName,
			comment,
			contactPhone,
			total,
			cart: items,
		});
	}
	return (
		<Button
			isDisabled={items.length === 0 || isLoading}
			isLoading={isLoading}
			onClick={handlAction}
		>
			Заказать
		</Button>
	);
};

export default OrderAction;
