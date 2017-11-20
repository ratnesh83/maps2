import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GETALL_JOB: 'APP_GETALL_JOB',
    APP_JOB_DETAIL_SUCCESS: 'APP_JOB_DETAIL_SUCCESS',
    APP_GET_CATEGORIES_JOB: 'APP_GET_CATEGORIES_JOB',
    APP_GET_CATEGORIES_JOB_SUCCESS: 'APP_GET_CATEGORIES_JOB_SUCCESS',
    APP_JOB_DETAIL_SUCCESS_CONSUMED: 'APP_JOB_DETAIL_SUCCESS_CONSUMED'

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

export type Actions
    = AppGetCategories
    | AppGetCategoriesSuccess 
    | AppGetAllJobDetail
    | AppJobDetailSuccess
    | AppJobDetailSuccessConsumed;

