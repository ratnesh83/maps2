import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    errorFound: null,
    request: null,
    requests: null,
    labours: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    activeRequest: null,
    filter: null,
    role: 'all',
    error: null
};

export const request: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_REQUESTS':
            return Object.assign({}, state, { requests: null });

        case 'APP_GET_REQUESTS_SUCCESS':
            return Object.assign({}, state, { requests: action.payload });

        case 'APP_GET_REQUEST':
            return Object.assign({}, state, { request: null });

        case 'APP_GET_REQUEST_SUCCESS':
            return Object.assign({}, state, { request: action.payload });

        case 'APP_GET_LABORS':
            return Object.assign({}, state, { labours: null });

        case 'APP_GET_LABORS_SUCCESS':
            return Object.assign({}, state, { labours: action.payload });

        case 'APP_POST_FEEDBACK':
            return Object.assign({}, state, { postFeedback: null });

        case 'APP_POST_FEEDBACK_SUCCESS':
            return Object.assign({}, state, { postFeedback: true });

        default:
            return state;
    }
};
