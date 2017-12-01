import { get } from 'lodash';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SettingsService } from '../../../services/settings/settings.service';
import { CalendarService } from '../../../services/calendar-service/calendar.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { JwtHelper } from 'angular2-jwt';
import { cloneDeep, random } from 'lodash';
import * as setting from './setting.actions';
import * as app from '../../../state/app.actions';
import * as auth from '../../../auth/state/auth.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';

const types = ['success', 'error', 'info', 'warning'];

@Injectable()
export class SettingEffects {
    public jwtHelper: JwtHelper = new JwtHelper();

    @Effect({ dispatch: false })
    getAvailability$ = this.actions$
        .ofType('APP_GET_AVAILABILITY')
        .do((action) => {
            this._spinner.show();
            this.CalendarService.getAllAvailability(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.statusCode == 200 || result.message == 'Action complete.') {
                    let busyDateToSend = [];
                    if (result && result.data) {
                        for (let i = 0; i < result.data.length; i++) {
                            let results = result.data[i];
                            if (results && results.busyDates) {
                                let busyDates = results.busyDates;
                                for (let j = 0; j < busyDates.length; j++) {
                                    busyDateToSend.push(busyDates[j]);
                                }
                            }
                        }
                    }
                    let dates = this.CalendarService.getData(busyDateToSend);
                    let payload = {
                        availabilities: dates,
                        busyDates: busyDateToSend
                    };
                    this.store.dispatch(new setting.GetAvailabilitySuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    updateCalendarInfo$ = this.actions$
        .ofType('UPDATE_CALENDER_INFO')
        .do((action) => {
            console.log(action.payload);
            this.SettingsService.updateProfileInfo(action.payload).subscribe((result) => {
                if (result.statusCode == 200) {
                    console.log('success');
                    let token = localStorage.getItem('tokenSession');
                    if (token && !this.jwtHelper.isTokenExpired(token)) {
                        let user = this.jwtHelper.decodeToken(token);
                        this.store.dispatch({
                            type: auth.actionTypes.AUTH_GET_USER_DETAILS_BY_ID,
                            payload: {
                                userId: user._id
                            }
                        });
                    }
                    this.store.dispatch({ type: setting.actionTypes.APP_GET_AVAILABILITY, payload: { } });
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        console.log('error');
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getServiceRadii$ = this.actions$
        .ofType('APP_GET_SERVICE_RADIUS')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.getServiceRadii(action.payload).subscribe((result) => {

                if (result.message == 'Success') {
                    let payload = result.data;
                    this.store.dispatch(new setting.AppGetServiceRadiiSuccess(payload));
                } else {
                    this._spinner.hide();
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getServiceRadiiSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_SERVICE_RADIUS_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: setting.actionTypes.APP_GET_QUALIFICATION,
                payload: {
                    isDeleted: 'all'
                }
            });
        });

    @Effect({ dispatch: false })
    getQualification$ = this.actions$
        .ofType('APP_GET_QUALIFICATION')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.getQualification(action.payload).subscribe((result) => {

                if (result.message == 'Success') {
                    let payload = {
                        qualifications: result.data
                    };
                    this.store.dispatch(new setting.AppGetQualificationSuccess(payload));
                } else {
                    this._spinner.hide();
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getQualificationSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_QUALIFICATION_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetExpertise({
                isDeleted: 'all'
            }));
        });

    @Effect({ dispatch: false })
    getExpertise$ = this.actions$
        .ofType('APP_GET_EXPERTISE')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.getExpertise(action.payload).subscribe((result) => {

                if (result.message == 'Success') {
                    let payload = {
                        expertise: result.data
                    };
                    this.store.dispatch(new setting.AppGetExpertiseSuccess(payload));
                } else {
                    this._spinner.hide();
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getExpertiseSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_EXPERTISE_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetEquipments({
                isDeleted: 'all'
            }));
        });

    @Effect({ dispatch: false })
    getEquipments$ = this.actions$
        .ofType('APP_GET_EQUIPMENTS')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.getEquipments(action.payload).subscribe((result) => {

                if (result.message == 'Success') {
                    let payload = {
                        equipments: result.data
                    };
                    this.store.dispatch(new setting.AppGetEquipmentsSuccess(payload));
                } else {
                    this._spinner.hide();
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getEquipmentsSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_EQUIPMENTS_SUCCESS')
        .do((action) => {
            this._spinner.hide();
        });

    @Effect({ dispatch: false })
    setServiceRadii$ = this.actions$
        .ofType('APP_SET_SERVICE_RADIUS')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.setServiceRadii(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {};
                    this.store.dispatch(new setting.AppSetServiceRadiiSuccess(payload));
                    let message = action.payload.message || 'Service radius updated';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }

            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    setServiceRadiiSuccess: Observable<Action> = this.actions$
        .ofType('APP_SET_SERVICE_RADIUS_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetServiceRadii({}));
        });

    @Effect({ dispatch: false })
    setQualification$ = this.actions$
        .ofType('APP_SET_QUALIFICATION')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.setQualification(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {};
                    this.store.dispatch(new setting.AppSetQualificationSuccess(payload));
                    let message = action.payload.message || 'Qualification updated';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }

            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    setQualificationSuccess: Observable<Action> = this.actions$
        .ofType('APP_SET_QUALIFICATION_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetServiceRadii({}));
        });

    @Effect({ dispatch: false })
    setExpertise$ = this.actions$
        .ofType('APP_SET_EXPERTISE')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.setExpertise(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {};
                    this.store.dispatch(new setting.AppSetExpertiseSuccess(payload));
                    let message = action.payload.message || 'Expertise Added';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    setExpertiseSuccess: Observable<Action> = this.actions$
        .ofType('APP_SET_EXPERTISE_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetServiceRadii({}));
        });

    @Effect({ dispatch: false })
    addMachine$ = this.actions$
        .ofType('APP_ADD_MACHINE')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.addMachine(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {};
                    this.store.dispatch(new setting.AppAddMachineSuccess(payload));
                    let message = action.payload.message || 'Equipment Added';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    addMachineSuccess: Observable<Action> = this.actions$
        .ofType('APP_ADD_MACHINE_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetServiceRadii({}));
        });

    @Effect({ dispatch: false })
    deleteQualification$ = this.actions$
        .ofType('APP_DELETE_QUALIFICATION')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.updateQualification(action.payload.ID).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {
                        index: action.payload.index
                    };
                    this.store.dispatch(new setting.AppDeleteQualificationSuccess(payload));
                    let message = action.payload.message || 'Qualification updated';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    deleteQualificationSuccess: Observable<Action> = this.actions$
        .ofType('APP_DELETE_QUALIFICATION_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetServiceRadii({}));
        });

    @Effect({ dispatch: false })
    updateExpertise$ = this.actions$
        .ofType('APP_UPDATE_EXPERTISE')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.updateExpertise(action.payload.ID).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload;
                    if (action.payload.deleteRequest == true) {
                        payload = {
                            index: action.payload.index,
                            deleteRequest: true
                        };
                    } else {
                        payload = {
                            index: action.payload.index
                        };
                    }
                    this.store.dispatch(new setting.AppUpdateExpertiseSuccess(payload));
                    let message = action.payload.message || 'Expertise Updated';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    updateExpertiseSuccess: Observable<Action> = this.actions$
        .ofType('APP_UPDATE_EXPERTISE_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetServiceRadii({}));
        });

    @Effect({ dispatch: false })
    updateMachine$ = this.actions$
        .ofType('APP_UPDATE_EQUIPMENTS')
        .do((action) => {
            this._spinner.show();
            this.SettingsService.updateEquipments(action.payload.ID).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload;
                    if (action.payload.deleteRequest == true) {
                        payload = {
                            index: action.payload.index,
                            deleteRequest: true
                        };
                    } else {
                        payload = {
                            index: action.payload.index
                        };
                    }
                    this.store.dispatch(new setting.AppUpdateEquipmentsSuccess(payload));
                    let message = action.payload.message || 'Equipment Updated';
                    let title = 'Success';
                    this.toastrService.clear();
                    this.toastrService.success(message, title);
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    uploadFile$ = this.actions$
        .ofType('UPLOAD_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].worker;
            this.SettingsService
                .uploadFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: setting.actionTypes.UPLOAD_FILE_SUCCESS, payload: {
                                fileUpload: {
                                    fileUploadUrl: result.data,
                                    type: action.payload.type,
                                    index: action.payload.index
                                }
                            }
                        });
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: setting.actionTypes.SETTINGS_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    updateMachineSuccess: Observable<Action> = this.actions$
        .ofType('APP_UPDATE_EQUIPMENTS_SUCCESS')
        .do((action) => {
            this.store.dispatch(new setting.AppGetServiceRadii({}));
        });

    @Effect({ dispatch: false })
    errorSettings$ = this.actions$
        .ofType('SETTINGS_ERROR')
        .do((action) => {
            this._spinner.hide();
            let message = action.payload.message;
            let title = 'Error';
            this.toastrService.clear();
            this.toastrService.error(message, title);
        });

    @Effect({ dispatch: false })
    getProfileInfo$ = this.actions$
        .ofType('GET_PROFILE_INFO')
        .do((action) => {
            console.log('2');
            let token = localStorage.getItem('tokenSession');
            let user;
            if (token && !this.jwtHelper.isTokenExpired(token)) {
                user = this.jwtHelper.decodeToken(token);
            }

            this.SettingsService.getProfileInfo(user._id).subscribe((result) => {
                if (result.statusCode == 200) {
                    let payload = result.data;
                    this._spinner.hide();
                    this.store.dispatch(new setting.GetProfileInfoSuccessAction(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                    }
                }
            );
        });
    @Effect({ dispatch: false })
    getProfileInfoId$ = this.actions$
        .ofType('GET_PROFILE_INFO_ID')
        .do((action) => {
            console.log('1');
            let userId = '5a1262033766a15de4c793c7';
            this.SettingsService.getProfileInfoId(userId).subscribe((result) => {
                if (result.statusCode == 200) {
                    let payload = result.data;
                    this._spinner.hide();
                    this.store.dispatch(new setting.GetProfileInfoIdSuccessAction(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                    }
                    this.store.dispatch(new setting.GetProfileInfoSuccessAction({}));
                }
            );
        });
    @Effect({ dispatch: false })
    updateProfileInfo$ = this.actions$
        .ofType('UPDATE_PROFILE_INFO')
        .do((action) => {
            console.log(action.payload);
            this.SettingsService.updateProfileInfo(action.payload).subscribe((result) => {
                if (result.statusCode == 200) {
                    console.log('success');
                    let token = localStorage.getItem('tokenSession');
                    if (token && !this.jwtHelper.isTokenExpired(token)) {
                        let user = this.jwtHelper.decodeToken(token);
                        this.store.dispatch({
                            type: auth.actionTypes.AUTH_GET_USER_DETAILS_BY_ID,
                            payload: {
                                userId: user._id
                            }
                        });
                    }
                    this.store.dispatch({ type: setting.actionTypes.GET_PROFILE_INFO, payload: { mode: 1 } });
                    this.router.navigate(['/pages/settings/userprofileedit']);
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        console.log('error');
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    }
                }
            );
        });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private toastrService: ToastrService,
        private SettingsService: SettingsService,
        private CalendarService: CalendarService,
        private _spinner: BaThemeSpinner
    ) {
    }

}

