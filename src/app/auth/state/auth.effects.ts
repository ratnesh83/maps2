import { get } from 'lodash';
import { Injectable, VERSION } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../service/user-service/user.service';
import { AuthService } from '../service/auth-service/auth.service';
import { BaThemeSpinner } from '../../theme/services';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import * as auth from './auth.actions';
const types = ['success', 'error', 'info', 'warning'];

@Injectable()
export class AuthEffects {
    private lastInserted: number[] = [];
    options: ToastrConfig;
    title = '';
    message = '';

    version = VERSION;

    @Effect({ dispatch: false })
    login: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_LOGIN)
        .do(action => {
            let numberOne = 100;

            this.UserService.login(action.payload).subscribe((result) => {
                if (result.statusCode === 200) {
                    // hide loader
                    this.baThemeSpinner.hide(numberOne);
                    //this.toast_service.showSuccess();
                    // this.store.dispatch({ type: 'AUTH_GET_USER_ROLES', payload: result });
                    this.store.dispatch(new auth.AuthLoginSuccessAction(result));
                    //token store in localstorage
                    localStorage.setItem('token', result.data.token);
                    let tokenSession = localStorage.getItem('token');
                    localStorage.setItem('tokenSession', JSON.stringify(result.data.token));
                    let loggedIn = this.authService.login();
                    if (loggedIn) {
                        // Get the redirect URL from our auth service
                        // If no redirect has been set, use the default
                        let redirect = 'pages';
                        if (this.authService.user.role === 'admin') {
                            //redirecting user to specfic roles
                            // console.log("Success fully admin  role redirect ");
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/dashboard';
                        }
                        else if (this.authService.user.role === 'customer') {
                            redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/settings/key-message';
                        } else if (this.authService.user.role === 'serviceProvider') {

                        } else if (this.authService.user.role === 'driver') {

                        }


                        this.router.navigate([redirect]);
                    }
                }
                else {
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();
                    if (error.message) {
                        let m = 'Email or password does not match !';
                        let t = 'Authentication';
                        const opt = cloneDeep(this.options);
                        this.toastrService.clear();
                        const inserted = this.toastrService[types[1]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
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

        });

    @Effect({ dispatch: false })
    registerSuccess: Observable<Action> = this.actions$
        .ofType(auth.actionTypes.AUTH_REGISTER_SUCCESS)
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
            let numberTwo = 100;
            this.baThemeSpinner.show();
            this.UserService.logoutUser().subscribe((result) => {
                if (result.statusCode === 200) {
                    this.baThemeSpinner.hide(numberTwo);
                    this.store.dispatch(new auth.AuthLogoutSuccessAction(result));
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('tokenSession');
                    window.localStorage.removeItem('editEmployerId');
                    window.localStorage.removeItem('editWorkerId');
                    this.router.navigate(['login']);
                }
            }
                , (error) => {
                    this.baThemeSpinner.hide(numberTwo);
                    this.store.dispatch(new auth.AuthLogoutSuccessAction(error));
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('tokenSession');
                    window.localStorage.removeItem('editEmployerId');
                    window.localStorage.removeItem('editWorkerId');
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
            let numberThree = 100;
            this.UserService.forgotPassword(action.payload).subscribe((result) => {
                if (result.statusCode === 200) {
                    this.store.dispatch(new auth.AuthForgotPasswordSuccess(result));
                    let m = 'Reset email sent successfully!';
                    let t = 'Authentication';
                    const opt = cloneDeep(this.options);
                    this.toastrService.clear();
                    const inserted = this.toastrService[types[0]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    //hide loader
                    this.baThemeSpinner.hide(numberThree);
                }
                else {

                }
            }
                , (error) => {
                    this.baThemeSpinner.hide();


                    if (error.message) {
                        let m = error.message;
                        let t = 'Authentication';
                        const opt = cloneDeep(this.options);
                        this.toastrService.clear();
                        const inserted = this.toastrService[types[1]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
                    }
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
        private baThemeSpinner: BaThemeSpinner,
        private router: Router,
        private toastrService: ToastrService
    ) {

        this.options = this.toastrService.toastrConfig;

    }
    openToast() {
        let m = 'amar';
        let t = 'amar';
        const opt = cloneDeep(this.options);
        this.toastrService.clear();
        const inserted = this.toastrService[1](m, t, opt);
        if (inserted) {
            this.lastInserted.push(inserted.toastId);
        }
        return inserted;
    }

}

