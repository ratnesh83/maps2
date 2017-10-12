import { Action } from '@ngrx/store';

export const actionTypes = {
    GET_DASHBOARD_COUNT: 'GET_DASHBOARD_COUNT',
    GET_DASHBOARD_COUNT_SUCCESS: 'GET_DASHBOARD_COUNT_SUCCESS',

};

type credentials = {

};

// /** GET DASHBOARD COUNT **/
export class AppGetDashBoardCount implements Action {
    type = actionTypes.GET_DASHBOARD_COUNT;


    constructor() { }

}

export class AppGetDashBoardCountSuccess implements Action {
    type = actionTypes.GET_DASHBOARD_COUNT_SUCCESS;


    constructor(public payload: credentials) { }

}



export type Actions
    = AppGetDashBoardCount;
