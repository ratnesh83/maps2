import { Action, ActionReducer } from '@ngrx/store';

const initialState: any = {
    currentUser: null,
    loggedIn: false,
    realms: [],
    roles: {
        assigned: [],
        unassigned: [],
    },
    countryCodes: []
};

export const auth: ActionReducer<any> = (state = initialState, action: Action) => {

    switch (action.type) {

        case 'AUTH_LOGIN':
            delete state.forgotPass;
            return Object.assign({}, state);

        case 'AUTH_LOGOUT_SUCCESS':
            delete state.forgotPass;
            return Object.assign({}, state, { currentUser: null, loggedIn: false });

        case 'AUTH_SET_TOKEN':
        case 'AUTH_LOGIN_SUCCESS':
            delete state.forgotPass;
            return Object.assign({}, state, { currentUser: action.payload, loggedIn: true });

        case 'AUTH_REALMS_ADD':
            delete state.forgotPass;
            return Object.assign({}, state, { realms: [...state.realms, action.payload] });

        case 'AUTH_SET_ROLES':
            delete state.forgotPass;
            return Object.assign({}, state, {
                roles: {
                    assigned: [...state.roles.assigned, ...action.payload.assigned],
                    unassigned: [...state.roles.unassigned, ...action.payload.unassigned],
                },
            });

        case 'AUTH_FORGOT_PASSWORD':
            delete state.forgotPass;
            return Object.assign({}, state);

        case 'AUTH_FORGOT_PASSWORD_SUCCESS':
            return Object.assign({}, state, { forgotPass: action.payload });

        case 'GET_COUNTRIES_SUCCESS':
            delete state.forgotPass;
            return Object.assign({}, state, { countryCodes: action.payload });

        default:
            return state;
    }
};
