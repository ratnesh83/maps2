import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GET_LABORS_LIST: 'APP_GET_LABORS_LIST',
    APP_GET_LABORS_LIST_SUCCESS: 'APP_GET_LABORS_LIST_SUCCESS',

};

type credentials = {};

export class AppGetLaborList implements Action {
    type = actionTypes.APP_GET_LABORS_LIST;
    constructor(public payload: credentials) { }
}

export class AppGetLaborListSuccess implements Action {
    type = actionTypes.APP_GET_LABORS_LIST_SUCCESS;
    constructor(public payload: credentials) { }
}

export type Actions
    = AppGetLaborList
    | AppGetLaborListSuccess;

