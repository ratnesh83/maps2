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
    getCategories$ = this.actions$
        .ofType('APP_GET_CATEGORIES')
        .do((action) => {
            this._spinner.show();
            this.RequestService.getAllCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppGetCategoriesSuccess(payload));
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

                        }
                    }
                }
            );
        });


    @Effect({ dispatch: false })
    getCategoriesSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_CATEGORIES_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getJobs$ = this.actions$
        .ofType('APP_GET_JOBS')
        .do((action) => {
            this._spinner.show();
            this.RequestService.getAllJobs(action.payload).subscribe((result) => {
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

                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getJobsSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_JOBS_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getJob$ = this.actions$
        .ofType('APP_GET_JOB')
        .do((action) => {
            this._spinner.show();
            this.RequestService.getJob(action.payload).subscribe((result) => {
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

                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getJobSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_JOB_SUCCESS')
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
        .ofType('APP_GET_SUB_CATEGORIES')
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

                        }
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getSubCategoriesSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_SUB_CATEGORIES_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    postJob$ = this.actions$
        .ofType('APP_POST_JOB')
        .do((action) => {
            this._spinner.show();
            this.RequestService.postJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new request.AppPostJobSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Job posted successfully', 'Success');
                    this.router.navigate(['/pages/requests/allposts']);
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
    postJobSuccess: Observable<Action> = this.actions$
        .ofType('APP_POST_JOB_SUCCESS')
        .do((action) => {

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

