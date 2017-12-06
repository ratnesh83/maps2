import { Action } from '@ngrx/store';

export const actionTypes = {

    APP_GET_LABORS_LIST: 'APP_GET_LABORS_LIST',
    APP_GET_LABORS_LIST_SUCCESS: 'APP_GET_LABORS_LIST_SUCCESS',
    APP_GET_EMPLOYERS_LIST: 'APP_GET_EMPLOYERS_LIST',
    APP_GET_EMPLOYERS_LIST_SUCCESS: 'APP_GET_EMPLOYERS_LIST_SUCCESS',
    APP_GET_FRIENDS_LIST: 'APP_GET_FRIENDS_LIST',
    APP_GET_FRIENDS_LIST_SUCCESS: 'APP_GET_FRIENDS_LIST_SUCCESS',
    APP_GET_COMPANIES_LIST: 'APP_GET_COMPANIES_LIST',
    APP_GET_COMPANIES_LIST_SUCCESS: 'APP_GET_COMPANIES_LIST_SUCCESS',

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

export class AppGetEmployerList implements Action {
    type = actionTypes.APP_GET_EMPLOYERS_LIST;
    constructor(public payload: credentials) { }
}

export class AppGetEmployerSuccess implements Action {
    type = actionTypes.APP_GET_EMPLOYERS_LIST_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetFriendsList implements Action {
    type = actionTypes.APP_GET_FRIENDS_LIST;
    constructor(public payload: credentials) { }
}

export class AppGetFriendsSuccess implements Action {
    type = actionTypes.APP_GET_FRIENDS_LIST_SUCCESS;
    constructor(public payload: credentials) { }
}

export class AppGetCompaniesList implements Action {
    type = actionTypes.APP_GET_COMPANIES_LIST;
    constructor(public payload: credentials) { }
}

export class AppGetCompaniesListSuccess implements Action {
    type = actionTypes.APP_GET_COMPANIES_LIST_SUCCESS;
    constructor(public payload: credentials) { }
}

export type Actions
    = AppGetLaborList
    | AppGetLaborListSuccess;

