import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { useReducer, useState } from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import AddressContext from '~/context/addressContext';
import { addressReducer, initial } from '~/reducer/addressReducer';
import { api } from '~/utils/api';
import CreateAddress from '../Address';
import UserAddressCard from '../User/Profile/UserAddress/UserAddressCard';
const NewOrder = () => {
	const { isSignedIn } = useAuth();
	const { data: addressList } = api.address.get.useQuery();
	const [address, dispatchAddress] = useReducer(addressReducer, initial);
	const {
		mutate: getPoints,
		data: points,
		isLoading: isLoadingCdek,
	} = api.cdek.getPoints.useMutation();
	const {
		mutate: createWithAddress,
		reset,
		isError,
		error,
	} = api.order.createIsAuthHaveAddress.useMutation();
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
	return (
		<AddressContext.Provider
			value={{
				address,
				dispatchAddress,
				handlPoints,
				valueSuggestion,
				points,
				isLoadingCdek,
				reset,
				isError,
			}}
		>
			<Stack>
				{isSignedIn ? (
					addressList?.length === 0 ? (
						<CreateAddress />
					) : (
						<RadioGroup onChange={(value) => console.log(value)}>
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
				) : null}
			</Stack>
		</AddressContext.Provider>
	);
};

export default NewOrder;
