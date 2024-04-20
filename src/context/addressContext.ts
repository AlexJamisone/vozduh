import { createContext, useContext, type Dispatch } from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import type { Action, AddressState } from '~/reducer/addressReducer';

export interface CreateAddressContext {
	address: AddressState;
	dispatchAddress: Dispatch<Action>;
	valueSuggestion: DaDataAddressSuggestion | undefined;
	handlPoints: (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => void;
	isLoadingCdek: boolean;
	isError: boolean;
	error?: {
		[x: string]: string[] | undefined;
		[x: number]: string[] | undefined;
		[x: symbol]: string[] | undefined;
	};
	reset: () => void;
}

const AddressContext = createContext<CreateAddressContext | null>(null);

export function useCreateAddressContext() {
	const context = useContext(AddressContext);
	if (!context)
		throw new Error(
			'CreateAddress.* component must be render as a child of CreateAddress comopnent'
		);
	return context;
}

export default AddressContext;
