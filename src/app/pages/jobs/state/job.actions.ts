import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GETALL_JOB: 'APP_GETALL_JOB',
    APP_JOB_DETAIL_SUCCESS: 'APP_JOB_DETAIL_SUCCESS',
    APP_GET_CATEGORIES_JOB: 'APP_GET_CATEGORIES_JOB',
    APP_GET_CATEGORIES_JOB_SUCCESS: 'APP_GET_CATEGORIES_JOB_SUCCESS',
    APP_JOB_DETAIL_SUCCESS_CONSUMED: 'APP_JOB_DETAIL_SUCCESS_CONSUMED',
    APP_GET_JOB: 'APP_GET_JOB',
    APP_GET_JOB_SUCCESS: 'APP_GET_JOB_SUCCESS',
    APP_GET_LABORS: 'APP_GET_LABORS',
    APP_GET_LABORS_SUCCESS: 'APP_GET_LABORS_SUCCESS',
    APP_ACCEPT_JOB: 'APP_ACCEPT_JOB',
    APP_ACCEPT_JOB_SUCCESS: 'APP_ACCEPT_JOB_SUCCESS',
    APP_GET_TOP_LIST: 'APP_GET_TOP_LIST',
    APP_GET_TOP_LIST_SUCCESS: 'APP_GET_TOP_LIST_SUCCESS'

};

type credentials = {};

export class AppGetCategories implements Action {
    type = actionTypes.APP_GET_CATEGORIES_JOB;
    constructor(public payload: credentials) { }
}

export class AppGetCategoriesSuccess implements Action {
    type = actionTypes.APP_GET_CATEGORIES_JOB_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetAllJobDetail implements Action {
    type = actionTypes.APP_GETALL_JOB;
    constructor(public payload: credentials) { }
}

export class AppJobDetailSuccess implements Action {
    type = actionTypes.APP_JOB_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppJobDetailSuccessConsumed implements Action {
    type = actionTypes.APP_JOB_DETAIL_SUCCESS_CONSUMED;
    constructor(public payload: credentials) { }
}

export class AppGetJob implements Action {
    type = actionTypes.APP_GET_JOB;
    constructor(public payload: credentials) { }
}

export class AppGetJobSuccess implements Action {
    type = actionTypes.APP_GET_JOB_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetLabors implements Action {
    type = actionTypes.APP_GET_LABORS;
    constructor(public payload: credentials) { }
}

export class AppGetLaborsSuccess implements Action {
    type = actionTypes.APP_GET_LABORS_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppAcceptJob implements Action {
    type = actionTypes.APP_ACCEPT_JOB;
    constructor(public payload: credentials) { }
}

export class AppAcceptJobSuccess implements Action {
    type = actionTypes.APP_ACCEPT_JOB_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetTopList implements Action {
    type = actionTypes.APP_GET_TOP_LIST;
    constructor(public payload: credentials) { }
}

export class AppGetTopListSuccess implements Action {
    type = actionTypes.APP_GET_TOP_LIST_SUCCESS;
    constructor(public payload: credentials) { }
}

export type Actions
    = AppGetCategories
    | AppGetCategoriesSuccess 
    | AppGetAllJobDetail
    | AppJobDetailSuccess
    | AppJobDetailSuccessConsumed;

