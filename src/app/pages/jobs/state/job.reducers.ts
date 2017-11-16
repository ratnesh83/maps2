import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    jobs: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activeJob: null,
    filter: null,
    role: 'all',
    error: null
};

export const job: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_CATEGORIES_SUCCESS':
            return Object.assign({}, state, { categories: action.payload });

        case 'APP_GETALL_JOB':
            return Object.assign({}, state);

        case 'APP_JOB_DETAIL_SUCCESS':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
