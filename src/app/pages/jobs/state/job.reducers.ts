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

        case 'APP_GET_CATEGORIES_JOB':
            delete state.getJobHit;
            delete state.getJobCategoryHit;
            return Object.assign({}, state);

        case 'APP_GET_CATEGORIES_JOB_SUCCESS':
            return Object.assign({}, state, { categories: action.payload, getJobCategoryHit: true });

        case 'APP_GETALL_JOB':
            delete state.getJobHit;
            delete state.getJobCategoryHit;
            return Object.assign({}, state, action.payload);

        case 'APP_JOB_DETAIL_SUCCESS':
            return Object.assign({}, state, action.payload, { getJobHit: true });

        case 'APP_JOB_DETAIL_SUCCESS_CONSUMED':
            delete state.getJobHit;
            return Object.assign({}, state);

        default:
            return state;
    }
};
