import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    labor: null,
    labors: null,
    labours: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activeLaborList: null,
    filter: null,
    role: 'all',
    error: null
};

export const network: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_LABORS_LIST':
            return Object.assign({}, state, { labors: null });

        case 'APP_GET_LABORS_LIST_SUCCESS':
            return Object.assign({}, state, { labors: action.payload });

        case 'APP_GET_EMPLOYERS_LIST':
            return Object.assign({}, state, { employers: null });

        case 'APP_GET_EMPLOYERS_LIST_SUCCESS':
            return Object.assign({}, state, { employers: action.payload });

        default:
            return state;
    }
};
