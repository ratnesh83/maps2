import { get } from 'lodash';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service/user-service/user.service';
import { AuthService } from '../service/auth-service/auth.service';
import { DataService } from '../../services/data-service/data.service';
import { BaThemeSpinner } from '../../theme/services';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import * as auth from './auth.actions';

const types = ['success', 'error', 'info', 'warning'];

@Injectable()
export class AuthEffects {

    @Effect({ dispatch: false })
    login: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_LOGIN)
        .do(action => {
            this.baThemeSpinner.show();
            this.UserService.login(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200) {
                    this.store.dispatch(new auth.AuthLoginSuccessAction(result));
                    localStorage.setItem('token', result.data.accessToken);
                    let tokenSession = localStorage.getItem('token');
                    localStorage.setItem('tokenSession', JSON.stringify(result.data.accessToken));
                    let loggedIn = this.authService.login();
                    if (loggedIn) {
                        let redirect = 'pages/home';
                        if (this.authService.user.userType === 'USER') {
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/home';
                        }
                        else if (this.authService.user.userType === 'EMPLOYER') {
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/home';
                        }
                        this.router.navigate([redirect]);
                        this.dataService.removeUserRegisterationId();
                        this.dataService.removeUserRegisterationAccessToken();
                    }
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.statusCode && error.statusCode == 451) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Please complete your registration', 'Error');
                        if (error.data && error.data.accessToken) {
                            this.dataService.setUserRegisterationAccessToken(error.data.accessToken);
                        }
                        if (error.data && error.data.userId) {
                            this.dataService.setUserRegisterationId(error.data.userId);
                        }
                        if (error.data && error.data.stepNumber) {
                            this.dataService.setStepNumber(error.data.stepNumber);
                            if (error.data.stepNumber == '1') {
                                this.router.navigate(['address']);
                            } else if (error.data.stepNumber == '2') {
                                this.router.navigate(['document']);
                            } else if (error.data.stepNumber == '3') {
                                this.router.navigate(['verification']);
                            } else if (error.data.stepNumber == '4') {
                                this.router.navigate(['verification']);
                            } else {
                                this.router.navigate(['address']);
                            }
                        }
                    } else if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Authentication');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    loginSocail: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_SOCIAL_LOGIN)
        .do(action => {
            this.baThemeSpinner.show();
            this.UserService.login(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200) {
                    this.store.dispatch(new auth.AuthLoginSuccessAction(result));
                    if (result.data && result.data.accessToken) {
                        localStorage.setItem('token', result.data.accessToken);
                        let tokenSession = localStorage.getItem('token');
                        localStorage.setItem('tokenSession', JSON.stringify(result.data.accessToken));
                    }
                    let loggedIn = this.authService.login();
                    if (loggedIn) {
                        let redirect = 'pages/home';
                        if (this.authService.user.userType === 'USER') {
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/home';
                        } else if (this.authService.user.userType === 'EMPLOYER') {
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/home';
                        }
                        this.router.navigate([redirect]);
                        this.dataService.removeUserRegisterationId();
                        this.dataService.removeUserRegisterationAccessToken();
                    }
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.statusCode && error.statusCode == 451) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Please complete your registration', 'Error');
                        if (error.data && error.data.accessToken) {
                            this.dataService.setUserRegisterationAccessToken(error.data.accessToken);
                        }
                        if (error.data && error.data.userId) {
                            this.dataService.setUserRegisterationId(error.data.userId);
                        }
                        if (error.data && error.data.stepNumber) {
                            this.dataService.setStepNumber(error.data.stepNumber);
                            if (error.data.stepNumber == '1') {
                                this.router.navigate(['address']);
                            } else if (error.data.stepNumber == '2') {
                                this.router.navigate(['document']);
                            } else if (error.data.stepNumber == '3') {
                                this.router.navigate(['verification']);
                            } else if (error.data.stepNumber == '4') {
                                this.router.navigate(['verification']);
                            } else {
                                this.router.navigate(['address']);
                            }
                        }
                    } else if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'User not found', 'Authentication');
                        this.router.navigate(['register']);
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    loginError: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_LOGIN_ERROR)
        .do((action) => {
        });

    @Effect({ dispatch: false })
    loginSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_LOGIN_SUCCESS)
        .do((action) => {
            window.localStorage.setItem('token', JSON.stringify(action.payload));
        });

    @Effect({ dispatch: false })
    register: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.register(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch(new auth.AuthRegisterSuccessAction(result));
                    if (result.data && result.data.accessToken) {
                        this.dataService.setUserRegisterationAccessToken(result.data.accessToken);
                    }
                    if (result.data._id) {
                        this.dataService.setUserRegisterationId(result.data._id);
                    }
                    this.router.navigate(['address']);
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.statusCode == 409) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'User already exists, please login to continue', 'Error');
                        this.router.navigate(['login']);
                    } else if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    registerSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER_SUCCESS)
        .do((action: any) => {
        });

    @Effect({ dispatch: false })
    registerAddress: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER_ADDRESS)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.registerAddress(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch(new auth.AuthRegisterAddressSuccessAction(result));
                    this.router.navigate(['document']);
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    registerAddressSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER_ADDRESS_SUCCESS)
        .do((action: any) => {
        });

    @Effect({ dispatch: false })
    registerDocuments: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER_DOCUMENTS)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.registerDocuments(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch(new auth.AuthRegisterDocumentsSuccessAction(result));
                    if (result.data && result.data.accessToken) {
                        this.dataService.setUserRegisterationAccessToken(result.data.accessToken);
                    }
                    this.router.navigate(['verification']);
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    registerDocumentsSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER_DOCUMENTS_SUCCESS)
        .do((action: any) => {
        });


    @Effect({ dispatch: false })
    resendOtp: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_RESEND_OTP)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.resendOtp(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch({
                        type: auth.actionTypes.AUTH_RESEND_OTP_SUCCESS,
                        payload: result
                    });
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'OTP sent', 'Success');
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    resendOtpSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_RESEND_OTP_SUCCESS)
        .do((action: any) => {
        });

    @Effect({ dispatch: false })
    sendVerificationType: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_SEND_VERIFICATION_TYPE)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.sendVerificationType(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch({
                        type: auth.actionTypes.AUTH_SEND_VERIFICATION_TYPE_SUCCESS,
                        payload: result
                    });
                    let routeState = 'verifyMobile';
                    if (action.payload && action.payload.verificationType == 'SMS') {
                        routeState = 'verifyMobile';
                        this.router.navigate([routeState]);
                    } else if (action.payload && action.payload.verificationType == 'EMAIL') {
                        routeState = 'verifyEmail';
                        this.router.navigate([routeState]);
                    } else if (action.payload && action.payload.type == 'SMS') {
                        this.toastrService.clear();
                        this.toastrService.success(result.message || 'Success', 'Success');
                    } else if (action.payload && action.payload.type == 'EMAIL') {
                        this.toastrService.clear();
                        this.toastrService.success(result.message || 'Success', 'Success');
                    }
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    sendVerificationTypeSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_SEND_VERIFICATION_TYPE_SUCCESS)
        .do((action: any) => {
        });

    @Effect({ dispatch: false })
    changePhone: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_CHANGE_PHONE)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.sendVerificationType(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch({
                        type: auth.actionTypes.AUTH_CHANGE_PHONE_SUCCESS,
                        payload: result
                    });
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Phone number changed successfully', 'Success');
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    changePhoneSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_CHANGE_PHONE_SUCCESS)
        .do((action: any) => {
            this.store.dispatch({ type: auth.actionTypes.AUTH_GET_USER_DETAILS, payload: { userId: this.dataService.getUserRegisterationId() } });
        });

    @Effect({ dispatch: false })
    changeEmail: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_CHANGE_EMAIL)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.sendVerificationType(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch({
                        type: auth.actionTypes.AUTH_CHANGE_EMAIL_SUCCESS,
                        payload: result
                    });
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Email changed successfully', 'Success');
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    changeEmailSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_CHANGE_EMAIL_SUCCESS)
        .do((action: any) => {
            this.store.dispatch({ type: auth.actionTypes.AUTH_GET_USER_DETAILS, payload: { userId: this.dataService.getUserRegisterationId() } });
        });


    @Effect({ dispatch: false })
    confirmSignUpOtp: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_CONFIRM_OTP_SIGNUP)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.confirmSignUpOtp(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    this.store.dispatch({
                        type: auth.actionTypes.AUTH_CONFIRM_OTP_SIGNUP_SUCCESS,
                        payload: result
                    });
                    if (result.data && result.data.accessToken) {
                        localStorage.setItem('token', result.data.accessToken);
                        let tokenSession = localStorage.getItem('token');
                        localStorage.setItem('tokenSession', JSON.stringify(result.data.accessToken));
                    }
                    let loggedIn = this.authService.login();
                    if (loggedIn) {
                        let redirect = 'pages/home';
                        if (this.authService.user.userType === 'USER') {
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/home';
                        } else if (this.authService.user.userType === 'EMPLOYER') {
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/home';
                        }
                        // this.router.navigate([redirect]);
                    }
                    this.dataService.removeUserRegisterationAccessToken();
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Registered successfully', 'Success');
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    confirmSignUpOtpSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_CONFIRM_OTP_SIGNUP_SUCCESS)
        .do((action: any) => {
        });

    @Effect({ dispatch: false })
    getUserDetails: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_GET_USER_DETAILS)
        .do((action: any) => {
            this.baThemeSpinner.show();
            this.UserService.getUserDetails(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200 || result.statusCode === 201) {
                    let data = result.data;
                    this.store.dispatch({
                        type: auth.actionTypes.AUTH_GET_USER_DETAILS_SUCCESS,
                        payload: data
                    });
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.statusCode == 401 || (error.message && error.message.indexOf('Session expired') != -1)) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        // this.router.navigate(['login']);
                    } else if (error.message) {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getUserDetailsSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_GET_USER_DETAILS_SUCCESS)
        .do((action: any) => {
        });

    @Effect({ dispatch: false })
    registerError: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER_ERROR)
        .do((action) => { });
    @Effect({ dispatch: false })
    logout: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_LOGOUT)
        .do(() => {
            this.baThemeSpinner.show();
            this.UserService.logoutUser().subscribe((result) => {
                if (result.statusCode === 200) {
                    this.baThemeSpinner.hide();
                    this.store.dispatch(new auth.AuthLogoutSuccessAction(result));
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenSession');
                    this.dataService.removeUserRegisterationId();
                    this.dataService.removeUserRegisterationAccessToken();
                    this.router.navigate(['login']);
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    this.store.dispatch(new auth.AuthLogoutSuccessAction(error));
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenSession');
                    this.dataService.removeUserRegisterationId();
                    this.dataService.removeUserRegisterationAccessToken();
                    this.router.navigate(['login']);
                }
            );

        });

    @Effect({ dispatch: false })
    logoutError: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_LOGOUT_ERROR)
        .do((action) => {

        });

    @Effect({ dispatch: false })
    logoutSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_LOGOUT_SUCCESS)
        .do(() => {

        });



    @Effect({ dispatch: false })
    getUserInfo$ = this.actions$
        .ofType('AUTH_GET_USER_ROLES')
        .do(action => {

        });

    @Effect({ dispatch: false })
    forgot$ = this.actions$
        .ofType('AUTH_FORGOT_PASSWORD')
        .do(action => {
            this.baThemeSpinner.show();
            this.UserService.forgotPassword(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200) {
                    this.store.dispatch(new auth.AuthForgotPasswordSuccess(result));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Success', 'Success');
                }
                else {

                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    this.toastrService.clear();
                    this.toastrService.error(error.message || 'User not found', 'Error');
                }
            );

        });

    @Effect({ dispatch: false })
    forgotOtp$ = this.actions$
        .ofType('AUTH_FORGOT_PASSWORD_OTP')
        .do(action => {
            this.baThemeSpinner.show();
            this.UserService.forgotPasswordOtp(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200) {
                    this.store.dispatch(new auth.AuthForgotPasswordOtpSuccess(result));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Success', 'Success');
                }
                else {

                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    this.toastrService.clear();
                    this.toastrService.error(error.message || 'Verification code is wrong', 'Error');
                }
            );

        });

    @Effect({ dispatch: false })
    resetPassword$ = this.actions$
        .ofType('AUTH_RESET_PASSWORD')
        .do(action => {
            this.baThemeSpinner.show();
            this.UserService.resetPassword(action.payload).subscribe((result) => {
                this.baThemeSpinner.hide();
                if (result.statusCode === 200) {
                    this.store.dispatch(new auth.AuthResetPasswordSuccess(result));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Success', 'Success');
                }
                else {

                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    this.toastrService.clear();
                    this.toastrService.error(error.message || 'Something went wrong', 'Error');
                }
            );

        });

    @Effect({ dispatch: false })
    getCountryCodes$ = this.actions$
        .ofType('GET_COUNTRIES')
        .do((action) => {
            this.UserService.getCountryCodes(action.payload).subscribe((result) => {
                this.store.dispatch({
                    type: auth.actionTypes.GET_COUNTRIES_SUCCESS, payload: result
                });
            }
                , (error) => {
                }
            );
        });

    @Effect({ dispatch: false })
    getCountryCodesSuccess: Observable<Action> = this.actions$
        .ofType('GET_COUNTRIES_SUCCESS')
        .do((action) => {

        });


    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private UserService: UserService,
        private authService: AuthService,
        private dataService: DataService,
        private baThemeSpinner: BaThemeSpinner,
        private router: Router,
        private toastrService: ToastrService
    ) { }

}

