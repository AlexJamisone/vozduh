import type { Point } from '@prisma/client';

export type AddressState = {
	id: string;
	firstName: string;
	lastName: string;
	contactPhone: string;
	point: {
		selected?: Point;
		isPointSelect?: boolean;
		selectedLat?: number;
		selectedLon?: number;
	};
	confirmPoint: boolean;
	errorConfirm: boolean;
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
	payload: {
		selected: Point;
		selectedLat: number;
		selectedLon: number;
	};
}
interface SetEditAction {
	type: 'SET_EDIT';
	payload: boolean;
}
interface SetMapAction {
	type: 'SET_MAP';
	payload: boolean;
}
interface SetSelectPointAction {
	type: 'SET_SELECT_POINT';
	payload: boolean;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: AddressState;
}
interface SetConfirmPointAction {
	type: 'SET_CONFIRM';
	payload: boolean;
}
interface SetConfirmErrorAction {
	type: 'SET_CONFIRM_ERROR';
	payload: boolean;
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
	| SetMapAction
	| SetSelectPointAction
	| SetConfirmPointAction
	| SetConfirmErrorAction;

export const initial: AddressState = {
	id: '',
	edit: false,
	map: false,
	point: {
		isPointSelect: false,
	},
	confirmPoint: false,
	contactPhone: '',
	firstName: '',
	lastName: '',
	errorConfirm: false,
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
			return {
				...state,
				point: {
					...state.point,
					selected: action.payload.selected,
					selectedLat: action.payload.selectedLat,
					selectedLon: action.payload.selectedLon,
				},
			};
		case 'SET_MAP':
			return { ...state, map: action.payload };
		case 'SET_SELECT_POINT':
			return {
				...state,
				point: {
					...state.point,
					isPointSelect: action.payload,
				},
			};
		case 'SET_CONFIRM':
			return { ...state, confirmPoint: action.payload };
		case 'SET_CONFIRM_ERROR':
			return { ...state, errorConfirm: action.payload };
		case 'SET_CLEAR':
			return {
				contactPhone: '',
				edit: false,
				firstName: '',
				id: '',
				lastName: '',
				map: false,
				point: {
					isPointSelect: false,
					selected: undefined,
					selectedLat: undefined,
					selectedLon: undefined,
				},
				confirmPoint: false,
				errorConfirm: false,
			};
		case 'SET_EDIT':
			return { ...state, edit: action.payload };
		case 'SET_ALL':
			return { ...state, ...action.payload };
	}
};
