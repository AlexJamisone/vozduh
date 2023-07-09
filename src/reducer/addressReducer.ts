import type { Point } from '@prisma/client';

export type AddressState = {
	id: string;
	firstName: string;
	lastName: string;
	contactPhone: string;
	point?: Point;
	map: boolean;
	edit: boolean;
};

interface SetIdAction {
	type: 'SET_ID';
	payload: string;
}
interface SetFirstAction {
	type: 'SET_FIRSTNAME';
	payload: string;
}
interface SetLastAction {
	type: 'SET_LASTNAME';
	payload: string;
}
interface SetPhoneAction {
	type: 'SET_PHONE';
	payload: string;
}
interface SetPointAction {
	type: 'SET_POINT';
	payload: Point;
}
interface SetEditAction {
	type: 'SET_EDIT';
	payload: boolean;
}
interface SetMapAction {
	type: 'SET_MAP';
	payload: boolean;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: AddressState;
}

export type Action =
	| SetAllAction
	| SetIdAction
	| SetFirstAction
	| SetLastAction
	| SetPhoneAction
	| SetPointAction
	| SetEditAction
	| SetClearAction
	| SetMapAction;

export const initial: AddressState = {
	id: '',
	edit: false,
	map: false,
	contactPhone: '',
	firstName: '',
	lastName: '',
};

export const addressReducer = (
	state: AddressState,
	action: Action
): AddressState => {
	switch (action.type) {
		case 'SET_ID':
			return { ...state, id: action.payload };
		case 'SET_FIRSTNAME':
			return { ...state, firstName: action.payload };
		case 'SET_LASTNAME':
			return { ...state, lastName: action.payload };
		case 'SET_PHONE':
			return { ...state, contactPhone: action.payload };
		case 'SET_POINT':
			return { ...state, point: action.payload };
		case 'SET_MAP':
			return { ...state, map: action.payload };
		case 'SET_CLEAR':
			return {
				contactPhone: '',
				edit: false,
				firstName: '',
				id: '',
				lastName: '',
				map: false,
			};
		case 'SET_EDIT':
			return { ...state, edit: action.payload };
		case 'SET_ALL':
			return { ...state, ...action.payload };
	}
};
