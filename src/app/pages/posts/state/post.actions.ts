import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GET_CATEGORIES: 'APP_GET_CATEGORIES',
    APP_GET_CATEGORIES_SUCCESS: 'APP_GET_CATEGORIES_SUCCESS',
    APP_GET_SUB_CATEGORIES: 'APP_GET_SUB_CATEGORIES',
    APP_GET_SUB_CATEGORIES_SUCCESS: 'APP_GET_SUB_CATEGORIES_SUCCESS',
    APP_POST_JOB: 'APP_POST_JOB',
    APP_POST_JOB_SUCCESS: 'APP_POST_JOB_SUCCESS'

};

type credentials = {};

export class AppGetCategories implements Action {
    type = actionTypes.APP_GET_CATEGORIES;
    constructor(public payload: credentials) { }
}

export class AppGetCategoriesSuccess implements Action {
    type = actionTypes.APP_GET_CATEGORIES_SUCCESS;
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

export class AppPostJob implements Action {
    type = actionTypes.APP_POST_JOB;
    constructor(public payload: credentials) { }
}

export class AppPostJobSuccess implements Action {
    type = actionTypes.APP_POST_JOB_SUCCESS;
    constructor(public payload: credentials) { }
}

export type Actions
    = AppGetCategories
    | AppGetCategoriesSuccess
    | AppGetSubCategories
    | AppGetSubCategoriesSuccess
    | AppPostJob
    | AppPostJobSuccess;

