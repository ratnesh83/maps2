import { Action } from '@ngrx/store';
export const actionTypes = {

    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS'
};
export class ChangePassword implements Action {
    type = actionTypes.CHANGE_PASSWORD;
    constructor(public payload: any = {}) { }
}
export class ChangePasswordSuccess implements Action {
    type = actionTypes.CHANGE_PASSWORD_SUCCESS;
    constructor() { }
}
export type Actions
    = ChangePassword
    | ChangePasswordSuccess
    ;
