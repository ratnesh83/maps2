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

        default:
            return state;
    }
};
