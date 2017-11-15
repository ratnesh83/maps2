import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    posts: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activePost: null,
    filter: null,
    role: 'all',
    error: null
};

export const post: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_CATEGORIES_SUCCESS':
            return Object.assign({}, state, { categories: action.payload });

        case 'APP_GET_SUB_CATEGORIES_SUCCESS':
            return Object.assign({}, state, { subCategories: action.payload });

        case 'APP_GET_JOBS_SUCCESS':
            return Object.assign({}, state, { posts: action.payload });

        case 'APP_GET_JOB_SUCCESS':
            return Object.assign({}, state, { post: action.payload });

        default:
            return state;
    }
};
