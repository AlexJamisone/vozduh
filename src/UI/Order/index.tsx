import { Radio, RadioGroup, Stack, useToast } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import type { Point } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import TotalSum from '~/components/TotalSum';
import AddressContext from '~/context/addressContext';
import { useCart } from '~/context/cartContext';
import { addressReducer, initial } from '~/reducer/addressReducer';
import { api } from '~/utils/api';
import CreateAddress from '../Address';
import CartItem from '../Cart/CartItem';
import UserAddressCard from '../User/Profile/UserAddress/UserAddressCard';
import OrderAction from './OrderAction';
const NewOrder = () => {
	const { isSignedIn } = useAuth();
	const { cart, dispatchCart } = useCart();
	const [isClient, setIsClient] = useState(false);
	const router = useRouter();
	useEffect(() => {
		setIsClient(true);
	}, []);
	const { data: addressList } = api.address.get.useQuery();
	const [address, dispatchAddress] = useReducer(addressReducer, initial);
	const {
		mutate: getPoints,
		data: points,
		isLoading: isLoadingCdek,
	} = api.cdek.getPoints.useMutation();
	const {
		mutate: createWithAddress,
		reset: resetWithAddress,
		isError: isErrorWithAddress,
		error: errorWithAddreess,
	} = api.order.createIsAuthHaveAddress.useMutation();

	const {
		mutate: createNoAddreess,
		reset: resetNoAddress,
		isError: isErrorNotAddress,
		error: errorNoAddress,
	} = api.order.createNoAddreess.useMutation();

	const toast = useToast();
	const ctx = api.useContext();
	const [valueSuggestion, setValueSuggestion] = useState<
		DaDataAddressSuggestion | undefined
	>();
	const handlPoints = (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => {
		setValueSuggestion(suggestion);
		getPoints(
			{ city: suggestion?.data.postal_code as string },
			{
				onSuccess: () => {
					dispatchAddress({ type: 'SET_MAP', payload: true });
				},
			}
		);
	};

	const handlOrder = () => {
		if (!address.confirmPoint && address.id.length === 0) {
			dispatchAddress({
				type: 'SET_CONFIRM_ERROR',
				payload: true,
			});
			toast({
				description: 'Введите город, потвердите пункт выдачи.',
				isClosable: true,
				duration: 3000,
				status: 'warning',
			});
		} else {
			if (addressList?.length === 0 || !isSignedIn) {
				createNoAddreess(
					{
						totalSum: cart.totalSum,
						cart: cart.items.map(
							({
								id,
								quantity,
								size: { value },
								additionalOptions,
								name,
								image,
							}) => ({
								productId: id,
								quantity,
								sizeValue: value,
								additionalServiceOption: additionalOptions?.map(
									({ optionTitle, serviceTitle }) =>
										`${optionTitle}: ${serviceTitle}`
								),
								name,
								image,
							})
						),
						address: {
							firstName: address.firstName,
							lastName: address.lastName,
							contactPhone: address.contactPhone,
							point: address.point.selected as Point,
						},
					},
					{
						onSuccess: ({ route, success }) => {
							void ctx.user.invalidate();
							dispatchAddress({ type: 'SET_CLEAR' });
							dispatchCart({ type: 'CLEAR' });
							toast({
								description: success,
								duration: null,
								isClosable: true,
								status: 'success',
								position: 'top-right',
							});
							void router.push(route);
						},
						onError: () => {
							toast({
								description: 'Ошибка',
								status: 'error',
								isClosable: true,
								position: 'top-right',
							});
						},
					}
				);
			} else {
				createWithAddress(
					{
						totalSum: cart.totalSum,
						addressId: address.id,
						cart: cart.items.map(
							({
								id,
								quantity,
								size: { value },
								additionalOptions,
								name,
								image,
							}) => ({
								productId: id,
								quantity,
								sizeValue: value,
								additionalServiceOption: additionalOptions?.map(
									({ optionTitle, serviceTitle }) =>
										`${optionTitle}: ${serviceTitle}`
								),
								image,
								name,
							})
						),
					},
					{
						onSuccess: ({ route, success }) => {
							void ctx.user.invalidate();
							void router.push(route);
							dispatchAddress({ type: 'SET_CLEAR' });
							dispatchCart({ type: 'CLEAR' });
							toast({
								description: success,
								duration: 5000,
								isClosable: true,
								status: 'success',
								position: 'top-right',
							});
						},
						onError: () => {
							toast({
								description: 'Ошибка',
								status: 'error',
								isClosable: true,
								position: 'top-right',
							});
						},
					}
				);
			}
		}
	};
	return (
		<AddressContext.Provider
			value={{
				address,
				dispatchAddress,
				handlPoints,
				valueSuggestion,
				points,
				isLoadingCdek,
				reset: resetNoAddress || resetWithAddress,
				isError: isErrorWithAddress || isErrorNotAddress,
				error:
					errorNoAddress?.data?.zodError?.fieldErrors ||
					errorWithAddreess?.data?.zodError?.fieldErrors,
			}}
		>
			<Stack py={75}>
				{isSignedIn ? (
					addressList?.length === 0 ? (
						<CreateAddress />
					) : (
						<RadioGroup
							onChange={(value) =>
								dispatchAddress({
									type: 'SET_ID',
									payload: value,
								})
							}
						>
							<Stack>
								{addressList?.map((address, index) => (
									<Radio key={address.id} value={address.id}>
										<UserAddressCard
											address={address}
											index={index}
										/>
									</Radio>
								))}
							</Stack>
						</RadioGroup>
					)
				) : (
					<CreateAddress />
				)}
				<Stack>
					{isClient && (
						<AnimatePresence>
							{cart.items.map((item, index) => (
								<CartItem
									key={index}
									item={item}
									index={index}
								/>
							))}
						</AnimatePresence>
					)}
				</Stack>
				<TotalSum sum={cart.totalSum} />
				<OrderAction action={handlOrder} />
			</Stack>
		</AddressContext.Provider>
	);
};

export default NewOrder;
