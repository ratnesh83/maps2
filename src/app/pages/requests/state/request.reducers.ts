import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    request: null,
    requests: null,
    labours: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activePost: null,
    filter: null,
    role: 'all',
    error: null
};

export const request: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_CATEGORIES_SUCCESS':
            return Object.assign({}, state, { categories: action.payload });

        case 'APP_GET_SUB_CATEGORIES_SUCCESS':
            return Object.assign({}, state, { subCategories: action.payload });

        case 'APP_GET_JOBS':
            return Object.assign({}, state, { requests: null });

        case 'APP_GET_JOBS_SUCCESS':
            return Object.assign({}, state, { requests: action.payload });

        case 'APP_GET_JOB':
            return Object.assign({}, state, { request: null });

        case 'APP_GET_JOB_SUCCESS':
            return Object.assign({}, state, { request: action.payload });

        case 'APP_GET_LABORS':
            return Object.assign({}, state, { labours: null });

        case 'APP_GET_LABORS_SUCCESS':
            return Object.assign({}, state, { labours: action.payload });

        default:
            return state;
    }
};
