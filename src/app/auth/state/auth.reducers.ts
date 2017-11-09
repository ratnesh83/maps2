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
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_LOGOUT_SUCCESS':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state, { currentUser: null, loggedIn: false });

        case 'AUTH_SET_TOKEN':
        case 'AUTH_LOGIN_SUCCESS':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state, { currentUser: action.payload, loggedIn: true });

        case 'AUTH_REALMS_ADD':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state, { realms: [...state.realms, action.payload] });

        case 'AUTH_SET_ROLES':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state, {
                roles: {
                    assigned: [...state.roles.assigned, ...action.payload.assigned],
                    unassigned: [...state.roles.unassigned, ...action.payload.unassigned],
                },
            });

        case 'AUTH_FORGOT_PASSWORD':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_FORGOT_PASSWORD_SUCCESS':
            return Object.assign({}, state, { forgotPass: action.payload });

        case 'AUTH_FORGOT_PASSWORD_OTP':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_FORGOT_PASSWORD_OTP_SUCCESS':
            return Object.assign({}, state, { forgotPassOtp: action.payload });

        case 'AUTH_RESET_PASSWORD':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_RESET_PASSWORD_SUCCESS':
            return Object.assign({}, state, { resetOtp: action.payload });

        case 'AUTH_CHANGE_PHONE':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_CHANGE_PHONE_SUCCESS':
            return Object.assign({}, state, { changePhone: action.payload });

        case 'AUTH_CHANGE_EMAIL':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_CHANGE_EMAIL_SUCCESS':
            return Object.assign({}, state, { changeEmail: action.payload });

        case 'AUTH_CONFIRM_OTP_SIGNUP':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_CONFIRM_OTP_SIGNUP_SUCCESS':
            return Object.assign({}, state, { confirmOtpSignup: action.payload });

        case 'AUTH_GET_USER_DETAILS':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.userDetails;
            delete state.confirmOtpSignup;
            return Object.assign({}, state);

        case 'AUTH_GET_USER_DETAILS_SUCCESS':
            return Object.assign({}, state, { userDetails: action.payload });

        case 'GET_COUNTRIES_SUCCESS':
            delete state.resetOtp;
            delete state.forgotPass;
            delete state.forgotPassOtp;
            delete state.changePhone;
            delete state.changeEmail;
            delete state.confirmOtpSignup;
            return Object.assign({}, state, { countryCodes: action.payload });

        default:
            return state;
    }
};
