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

const initialTopState: any = {
    errorFound: null,
    topList: null,
    count: 0,
    currentPage: 0,
    limit: 5,
    error: null
};

export const labor: ActionReducer<any> = (state = initialState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_CATEGORIES_LABOR':
            delete state.getLaborHit;
            delete state.getLaborCategoryHit;
            return Object.assign({}, state);

        case 'APP_GET_CATEGORIES_LABOR_SUCCESS':
            return Object.assign({}, state, { categories: action.payload, getLaborCategoryHit: true });

        case 'APP_GETALL_LABOR':
            delete state.getLaborHit;
            delete state.getLaborCategoryHit;
            return Object.assign({}, state, action.payload);

        case 'APP_LABOR_DETAIL_SUCCESS':
            return Object.assign({}, state, action.payload, { getLaborHit: true });

        case 'APP_LABOR_DETAIL_SUCCESS_CONSUMED':
            delete state.getLaborHit;
            return Object.assign({}, state);

        default:
            return state;
    }
};

export const topList: ActionReducer<any> = (state = initialTopState, action: Action) => {
    switch (action.type) {

        case 'APP_GET_TOP_LIST_COPY':
            return Object.assign({}, state, { topList: null });

        case 'APP_GET_TOP_LIST_COPY_SUCCESS':
            return Object.assign({}, state, { topList: action.payload });

        default:
            return state;
    }
};