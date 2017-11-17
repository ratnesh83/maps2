import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    labors: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activeLabor: null,
    filter: null,
    role: 'all',
    error: null
};

export const labor: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_CATEGORIES':
            delete state.getLaborHit;
            return Object.assign({}, state);

        case 'APP_GET_CATEGORIES_SUCCESS':
            return Object.assign({}, state, { categories: action.payload });

        case 'APP_LABOR_DETAIL_SUCCESS':
            return Object.assign({}, state, action.payload, { getLaborHit: true });

        default:
            return state;
    }
};
