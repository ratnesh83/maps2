import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GET_REQUESTS: 'APP_GET_REQUESTS',
    APP_GET_REQUESTS_SUCCESS: 'APP_GET_REQUESTS_SUCCESS',
    APP_GET_LABORS: 'APP_GET_LABORS',
    APP_GET_LABORS_SUCCESS: 'APP_GET_LABORS_SUCCESS',
    APP_GET_REQUEST: 'APP_GET_REQUEST',
    APP_GET_REQUEST_SUCCESS: 'APP_GET_REQUEST_SUCCESS',
    APP_GET_SUB_CATEGORIES: 'APP_GET_SUB_CATEGORIES',
    APP_GET_SUB_CATEGORIES_SUCCESS: 'APP_GET_SUB_CATEGORIES_SUCCESS',
    APP_POST_REQUEST: 'APP_POST_REQUEST',
    APP_POST_REQUEST_SUCCESS: 'APP_POST_REQUEST_SUCCESS'

};

type credentials = {};

export class AppGetJobs implements Action {
    type = actionTypes.APP_GET_REQUESTS;
    constructor(public payload: credentials) { }
}

export class AppGetJobsSuccess implements Action {
    type = actionTypes.APP_GET_REQUESTS_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetJob implements Action {
    type = actionTypes.APP_GET_REQUEST;
    constructor(public payload: credentials) { }
}

export class AppGetJobSuccess implements Action {
    type = actionTypes.APP_GET_REQUEST_SUCCESS;
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

export class AppGetSubCategories implements Action {
    type = actionTypes.APP_GET_SUB_CATEGORIES;
    constructor(public payload: credentials) { }
}

export class AppGetSubCategoriesSuccess implements Action {
    type = actionTypes.APP_GET_SUB_CATEGORIES_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppRequestJob implements Action {
    type = actionTypes.APP_POST_REQUEST;
    constructor(public payload: credentials) { }
}

export class AppRequestJobSuccess implements Action {
    type = actionTypes.APP_POST_REQUEST_SUCCESS;
    constructor(public payload: credentials) { }
}

export type Actions
    = AppGetJobs
    | AppGetJobsSuccess
    | AppGetSubCategories
    | AppGetSubCategoriesSuccess
    | AppRequestJob
    | AppRequestJobSuccess;

