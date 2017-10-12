import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    role: 'admin',
    newPass: null


};

export const pass: ActionReducer<any> = (state = initialState, action: Action) => {

    switch (action.type) {

        case 'CHANGE_PASSWORD':
            return Object.assign({}, { newPass: action.payload }, state);

        case 'CHANGE_PASSWORD_SUCCESS':
            return Object.assign({}, { ChangePasswordSuccess: action.payload }, state);
        default:
            return state;
    }
};
