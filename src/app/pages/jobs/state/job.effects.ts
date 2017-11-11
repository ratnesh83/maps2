import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
import { cloneDeep, random } from 'lodash';
import { JobService } from '../../../services/job-service/job.service';
import * as job from './job.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';


@Injectable()
export class JobEffects {

    @Effect({ dispatch: false })
    getAllJobs$ = this.actions$
        .ofType('APP_GETALL_JOB')
        .do((action) => {
            this._spinner.show();
            this.JobService.getAllStaticJobs(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let filters = (action.payload.filter) ? action.payload.filter : null;
                    let payload = {
                        jobs: result.data,
                        count: result.data.length
                    };

                    this.store.dispatch(new job.AppJobDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getJobDetail$ = this.actions$
        .ofType('APP_GET_JOB_DETAIL')
        .do((action) => {
            this._spinner.show();
            this.JobService.getJobDetail(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let payload = {
                        job: result.data
                    };
                    this.store.dispatch(new job.AppGetJobDetailSuccess(payload));
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    SearchJob$ = this.actions$
        .ofType('SEARCH_JOB_DETAIL')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].job;
            this.JobService
                .getAllJobs(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {

                        let filters = (action.payload.filter) ? action.payload.filter : null;
                        if (result.data.count == 0) {

                            let payload = {
                                jobs: result.data.jobs,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };

                            this.store.dispatch(new job.AppJobDetailSuccess(payload));

                        } else {
                            let payload = {
                                jobs: result.data.jobs,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };

                            this.store.dispatch(new job.AppJobDetailSuccess(payload));
                        }

                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    employerDetailSuccess: Observable<Action> = this.actions$
        .ofType('APP_JOB_DETAIL_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    showJobDetail: Observable<Action> = this.actions$
        .ofType('SHOW_JOB_DETAIL')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    deleteJobRecordConfirm$ = this.actions$
        .ofType('DELETE_JOB_RECORD_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    blockThisJob$ = this.actions$
        .ofType('BLOCK_THIS_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].job;
            this._spinner.show();
            this.JobService
                .blockThisJob(action.payload.blockId)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: job.actionTypes.APP_GETALL_JOB, payload: {
                                currentPage: state.currentPage, limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                    }

                    let message;
                    let title = 'Success';
                    if (action.payload.blockId && action.payload.blockId.isBlocked == true) {
                        message = 'Job successfully blocked';
                    } else {
                        message = 'Job successfully unblocked';
                    }
                    this.toastrService.clear();
                    this.toastrService.success(message, title);

                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    blockJobRecordConfirm$ = this.actions$
        .ofType('BLOCK_THIS_JOB_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    errorJob$ = this.actions$
        .ofType('JOB_ERROR')
        .do((action) => {
            this._spinner.hide();
            let message = action.payload.message;
            let title = 'Error';
            this.toastrService.clear();
            this.toastrService.error(message, title);
        });

    @Effect({ dispatch: false })
    editJobRecordConfirm$ = this.actions$
        .ofType('EDIT_THIS_JOB_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    createJob$ = this.actions$
        .ofType('CREATE_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].job;

            this.JobService
                .createJob(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: job.actionTypes.CREATE_JOB_SUCCESS,
                            payload: result
                        });
                        this.store.dispatch({
                            type: job.actionTypes.APP_GETALL_JOB,
                            payload: {
                                currentPage: state.currentPage,
                                limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter
                            }
                        });
                        let message = 'Job successfully created';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    createJobFileSuccess: Observable<Action> = this.actions$
        .ofType('CREATE_JOB_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    editThisJob$ = this.actions$
        .ofType('EDIT_THIS_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].job;

            this.JobService
                .updateJob(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editJobId') != undefined) {
                            this.store.dispatch({
                                type: job.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editJobId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: job.actionTypes.EDIT_JOB_SUCCESS,
                            payload: result
                        });
                        let message = 'Job successfully updated';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    approveThisJob$ = this.actions$
        .ofType('APPROVE_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {
            this._spinner.show();
            let action = storeState[0];
            let state = storeState[1].job;

            this.JobService
                .approveJob(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editJobId') != undefined) {
                            this.store.dispatch({
                                type: job.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editJobId')
                                }
                            });
                        }
                        this.store.dispatch({
                            type: job.actionTypes.APPROVE_JOB_SUCCESS,
                            payload: result
                        });
                        let message = 'Job successfully approved';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    rejectThisJob$ = this.actions$
        .ofType('REJECT_JOB')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].job;
            this._spinner.show();
            this.JobService
                .rejectJob(action.payload)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editJobId') != undefined) {
                            this.store.dispatch({
                                type: job.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editJobId')
                                }
                            });
                        }
                        let message = 'Job successfully rejected';
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    changeJobDocumentApproval$ = this.actions$
        .ofType('CHANGE_JOB_DOCUMENT_APPROVAL')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].job;
            this._spinner.show();
            this.JobService
                .changeJobDocumentApproval(action.payload.data)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        if (localStorage.getItem('editJobId') != undefined) {
                            this.store.dispatch({
                                type: job.actionTypes.APP_GET_JOB_DETAIL,
                                payload: {
                                    userId: localStorage.getItem('editJobId')
                                }
                            });
                        }
                        let message;
                        if (action.payload.rejection == true) {
                            message = 'Job document successfully rejected';
                        } else {
                            message = 'Job document successfully approved';
                        }
                        let title = 'Success';
                        this.toastrService.clear();
                        this.toastrService.success(message, title);
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    EditJobSuccess$ = this.actions$
        .ofType('EDIT_JOB_SUCCESS')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    uploadJobFile$ = this.actions$
        .ofType('UPLOAD_JOB_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].job;
            this.JobService
                .uploadFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        let fileUplaod;
                        if (action.payload.index != undefined) {
                            fileUplaod = {
                                fileUploadUrl: result.data,
                                type: action.payload.type,
                                index: action.payload.index
                            };
                        } else {
                            fileUplaod = {
                                fileUploadUrl: result.data,
                                type: action.payload.type
                            };
                        }
                        this.store.dispatch({
                            type: job.actionTypes.UPLOAD_JOB_FILE_SUCCESS, payload: {
                                fileUpload: fileUplaod
                            }
                        });
                    }
                }, (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadJobFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_JOB_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    uploadJobMultipleFile$ = this.actions$
        .ofType('UPLOAD_JOB_MULTIPLE_FILE')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].job;
            this.JobService
                .uploadMultipleFile(action.payload.data)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: job.actionTypes.UPLOAD_JOB_MULTIPLE_FILE_SUCCESS, payload: {
                                fileUpload: {
                                    fileUploadUrl: result.data[0],
                                    fileUploadUrls: result.data,
                                    type: action.payload.type
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
                        /* this.store.dispatch({
                            type: job.actionTypes.JOB_ERROR, payload: error
                        }); */
                    }
                });
        });

    @Effect({ dispatch: false })
    uploadJobMultipleFileSuccess: Observable<Action> = this.actions$
        .ofType('UPLOAD_JOB_MULTIPLE_FILE_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getCountryCodes$ = this.actions$
        .ofType('GET_COUNTRY_CODE')
        .do((action) => {
            this.JobService.getCountryCodes(action.payload).subscribe((result) => {
                this.store.dispatch({
                    type: job.actionTypes.GET_COUNTRY_CODE_SUCCESS, payload: result
                });
                this.store.dispatch({
                    type: job.actionTypes.GET_COUNTRY_CODE_SUCCESS, payload: result
                });
            }
                , (error) => {
                }
            );
        });

    @Effect({ dispatch: false })
    getCountryCodesSuccess: Observable<Action> = this.actions$
        .ofType('GET_COUNTRY_CODE_SUCCESS')
        .do((action) => {

        });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private JobService: JobService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }

}

