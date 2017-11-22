import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GETALL_LABOR: 'APP_GETALL_LABOR',
    APP_LABOR_DETAIL_SUCCESS: 'APP_LABOR_DETAIL_SUCCESS',
    APP_GET_CATEGORIES_LABOR: 'APP_GET_CATEGORIES_LABOR',
    APP_GET_CATEGORIES_LABOR_SUCCESS: 'APP_GET_CATEGORIES_LABOR_SUCCESS',
    APP_LABOR_DETAIL_SUCCESS_CONSUMED: 'APP_LABOR_DETAIL_SUCCESS_CONSUMED',
    APP_GET_TOP_LIST_COPY: 'APP_GET_TOP_LIST_COPY',
    APP_GET_TOP_LIST_COPY_SUCCESS: 'APP_GET_TOP_LIST_COPY_SUCCESS'

};

type credentials = {};

export class AppGetCategories implements Action {
    type = actionTypes.APP_GET_CATEGORIES_LABOR;
    constructor(public payload: credentials) { }
}

export class AppGetCategoriesSuccess implements Action {
    type = actionTypes.APP_GET_CATEGORIES_LABOR_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetAllLaborDetail implements Action {
    type = actionTypes.APP_GETALL_LABOR;
    constructor(public payload: credentials) { }
}

export class AppLaborDetailSuccess implements Action {
    type = actionTypes.APP_LABOR_DETAIL_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppLaborDetailSuccessConsumed implements Action {
    type = actionTypes.APP_LABOR_DETAIL_SUCCESS_CONSUMED;
    constructor(public payload: credentials) { }
}

export class AppGetTopList implements Action {
    type = actionTypes.APP_GET_TOP_LIST_COPY;
    constructor(public payload: credentials) { }
}

export class AppGetTopListSuccess implements Action {
    type = actionTypes.APP_GET_TOP_LIST_COPY_SUCCESS;
    constructor(public payload: credentials) { }
}

export type Actions
    = AppGetCategories
    | AppGetCategoriesSuccess 
    | AppGetAllLaborDetail
    | AppLaborDetailSuccess
    | AppLaborDetailSuccessConsumed;

