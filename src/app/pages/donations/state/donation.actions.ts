import { Action } from '@ngrx/store';

export const actionTypes = {
    SETTINGS_KEY_MESSAGE: 'SETTINGS_KEY_MESSAGE',
    SETTINGS_KEY_MESSAGE_SUCCESS: 'SETTINGS_KEY_MESSAGE_SUCCESS',
    GET_DONATIONS: 'GET_DONATIONS',
    GET_DONATIONS_SUCCESS: 'GET_DONATIONS_SUCCESS'
};
type credentials = {};

//ADD THIS DRIVER
export class AddThisKey implements Action {
    type = actionTypes.SETTINGS_KEY_MESSAGE;
    constructor(public payload: credentials) { }
};
export class AddThisKeySuccess implements Action {
    type = actionTypes.SETTINGS_KEY_MESSAGE_SUCCESS;
    constructor(public payload: credentials) { }
};
export class GetDonationsAction implements Action {
    type = actionTypes.GET_DONATIONS;
    constructor(public payload: any) { }
};
export class GetDonationsSuccessAction implements Action {
    type = actionTypes.GET_DONATIONS_SUCCESS;
    constructor(public payload: any) { }
};
export type Actions
    = AddThisKey
    | AddThisKeySuccess
    | GetDonationsAction
    | GetDonationsSuccessAction
    ;