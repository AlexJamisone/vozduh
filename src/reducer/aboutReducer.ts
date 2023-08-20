export type AboutState = {
	id: string;
	title: string;
	content: string;
	edit: boolean;
};

interface SetAbout {
	type: 'SET_ABOUT';
	payload: AboutState;
}

interface SetClear {
	type: 'CLEAR';
}

export type Action = SetAbout | SetClear;

export const initialState: AboutState = {
	content: '',
	edit: false,
	id: '',
	title: '',
};

export const aboutReducer = (state: AboutState, action: Action): AboutState => {
	switch (action.type) {
		case 'SET_ABOUT':
			return {
				...state,
				content: action.payload.content,
				edit: action.payload.edit,
				id: action.payload.id,
				title: action.payload.title,
			};
		case 'CLEAR': {
			return initialState;
		}
		default:
			return state;
	}
};
