import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import { RequestService } from '../../../services/request-service/request.service';
import * as request from './request.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';

@Injectable()
export class RequestEffects {

    @Effect({ dispatch: false })
    getJobs$ = this.actions$
        .ofType('APP_GET_REQUESTS')
        .do((action) => {
            this._spinner.show();
            this.RequestService.getAllRequests(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    /* let payload = {
                        jobs: result.data,
                        currentPage: action.payload.currentPage,
                        limit: action.payload.limit,
                        count: result.data.count
                    }; */
                    let payload = result.data;
                    this.store.dispatch(new request.AppGetJobsSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getJobsSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_REQUESTS_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getJob$ = this.actions$
        .ofType('APP_GET_REQUEST')
        .do((action) => {
            this._spinner.show();
            this.RequestService.getRequest(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data[0];
                    this.store.dispatch(new request.AppGetJobSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getJobSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_REQUEST_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getLabors$ = this.actions$
        .ofType('APP_GET_LABORS')
        .do((action) => {
            this._spinner.show();
            this.RequestService.getLabors(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppGetLaborsSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getLaborsSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_LABORS_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getSubCategories$ = this.actions$
        .ofType('APP_GET_SUB_CATEGORIES_REQUEST')
        .do((action) => {
            this._spinner.show();
            this.RequestService.getAllSubCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppGetSubCategoriesSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getSubCategoriesSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_SUB_CATEGORIES_REQUEST_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    requestJob$ = this.actions$
        .ofType('APP_POST_REQUEST')
        .do((action) => {
            this._spinner.show();
            this.RequestService.requestJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppRequestJobSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Job requested successfully', 'Success');
                    this.router.navigate(['/pages/requests/allrequests']);
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });


    @Effect({ dispatch: false })
    requestJobSuccess: Observable<Action> = this.actions$
        .ofType('APP_POST_REQUEST_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    cancelJob$ = this.actions$
        .ofType('APP_CANCEL_JOB_REQUEST')
        .do((action) => {
            this._spinner.show();
            this.RequestService.cancelJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppCancelJobSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Job cancelled successfully', 'Success');
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    cancelJobSuccess: Observable<Action> = this.actions$
        .ofType('APP_CANCEL_JOB_REQUEST_SUCCESS')
        .do((action) => {
            this.router.navigate(['/pages/requests/allrequests']);
        });

    @Effect({ dispatch: false })
    acceptJob$ = this.actions$
        .ofType('APP_ACCEPT_JOB_REQUEST')
        .do((action) => {
            this._spinner.show();
            this.RequestService.acceptJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppAcceptJobSuccess(payload));
                    this.toastrService.clear();
                    if (action.payload && action.payload.action == 'ACCEPTED_BY_LABOUR') {
                        let data = {
                            canApply: 0
                        };
                        this.store.dispatch(new request.AppCheckApplySuccess(data));
                        this.toastrService.success(result.message || 'Request applied successfully', 'Success');
                    } else {
                        let data = {
                            canApply: 1
                        };
                        this.store.dispatch(new request.AppCheckApplySuccess(data));
                        this.toastrService.success(result.message || 'Request cancelled successfully', 'Success');
                    }
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    acceptJobSuccess: Observable<Action> = this.actions$
        .ofType('APP_ACCEPT_JOB_REQUEST_SUCCESS')
        .do((action) => {
            // this.router.navigate(['/pages/requests/allrequests']);
        });

    @Effect({ dispatch: false })
    checkEligibilty$ = this.actions$
        .ofType('APP_CHECK_APPLY')
        .do((action) => {
            this._spinner.show();
            this.RequestService.checkApply(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppCheckApplySuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    checkEligibiltySuccess: Observable<Action> = this.actions$
        .ofType('APP_CHECK_APPLY_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    postFeedback$ = this.actions$
        .ofType('APP_POST_FEEDBACK')
        .do((action) => {
            this._spinner.show();
            this.RequestService.postFeedback(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppPostFeedbackSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Feedback posted successfully', 'Success');
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error) {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                            this.store.dispatch({
                                type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                            });
                        } else {
                            this.toastrService.clear();
                            this.toastrService.error(error.message || 'Something went wrong', 'Error');
                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    postFeedbackSuccess: Observable<Action> = this.actions$
        .ofType('APP_POST_FEEDBACK_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: request.actionTypes.APP_GET_REQUESTS, payload: {
                    type: 'COMPLETED'
                }
            });
        });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private RequestService: RequestService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }

}

