import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GET_CATEGORIES: 'APP_GET_CATEGORIES',
    APP_GET_CATEGORIES_SUCCESS: 'APP_GET_CATEGORIES_SUCCESS',
    APP_GET_JOBS: 'APP_GET_JOBS',
    APP_GET_JOBS_SUCCESS: 'APP_GET_JOBS_SUCCESS',
    APP_GET_LABORS: 'APP_GET_LABORS',
    APP_GET_LABORS_SUCCESS: 'APP_GET_LABORS_SUCCESS',
    APP_GET_JOB: 'APP_GET_JOB',
    APP_GET_JOB_SUCCESS: 'APP_GET_JOB_SUCCESS',
    APP_GET_SUB_CATEGORIES: 'APP_GET_SUB_CATEGORIES',
    APP_GET_SUB_CATEGORIES_SUCCESS: 'APP_GET_SUB_CATEGORIES_SUCCESS',
    APP_POST_JOB: 'APP_POST_JOB',
    APP_POST_JOB_SUCCESS: 'APP_POST_JOB_SUCCESS',
    APP_EDIT_POST: 'APP_EDIT_POST',
    APP_EDIT_POST_SUCCESS: 'APP_EDIT_POST_SUCCESS',
    APP_HIRE_LABOR: 'APP_HIRE_LABOR',
    APP_HIRE_LABOR_SUCCESS: 'APP_HIRE_LABOR_SUCCESS',
    APP_REJECT_LABOR: 'APP_REJECT_LABOR',
    APP_REJECT_LABOR_SUCCESS: 'APP_REJECT_LABOR_SUCCESS'

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

export class AppGetJobs implements Action {
    type = actionTypes.APP_GET_JOBS;
    constructor(public payload: credentials) { }
}

export class AppGetJobsSuccess implements Action {
    type = actionTypes.APP_GET_JOBS_SUCCESS;
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

export class AppHireLaborSuccess implements Action {
    type = actionTypes.APP_HIRE_LABOR_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppRejectLaborSuccess implements Action {
    type = actionTypes.APP_REJECT_LABOR_SUCCESS;
    constructor(public payload: credentials) { }
}

export type Actions
    = AppGetCategories
    | AppGetCategoriesSuccess
    | AppGetJobs
    | AppGetJobsSuccess
    | AppGetSubCategories
    | AppGetSubCategoriesSuccess
    | AppPostJob
    | AppPostJobSuccess;

