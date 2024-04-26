import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAddress } from '~/store/useAddress';
import { useCart } from '~/store/useCart';
import { api } from '~/utils/api';
const OrderAction = () => {
	const route = useRouter();
	const { mutate: create, isLoading } = api.order.create.useMutation({
		onSuccess: (id) => {
			void ctx.order.invalidate();
			clear();
			route.push(`/order/${id}`);
		},
		onError: ({ data, message }) => {
			if (data?.zodError) {
				setError({ isError: true, path: data.zodError });
				return;
			}
			toast({ description: message, status: 'error' });
		},
	});
	const [total, items, clearCart] = useCart((state) => [
		state.total,
		state.items,
		state.clear,
	]);
	const [input, id, ctrl, setError, point, clearAdr] = useAddress((state) => [
		state.input,
		state.edit.id,
		state.controller,
		state.setError,
		state.point?.selected,
		state.clear,
	]);
	const ctx = api.useContext();
	const toast = useToast();
	function clear() {
		clearCart();
		clearAdr();
	}
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
			cart: items.map((item) => ({
				...item,
				additionalServiceOption: item.service.map(
					(o) => `${o.title}: ${o.optionTitle}`
				),
			})),
			point: point?.addressFullName,
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
