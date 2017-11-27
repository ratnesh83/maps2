import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import { PostService } from '../../../services/post-service/post.service';
import { DataService } from '../../../services/data-service/data.service';
import * as post from './post.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';

@Injectable()
export class PostEffects {

    @Effect({ dispatch: false })
    getCategories$ = this.actions$
        .ofType('APP_GET_CATEGORIES')
        .do((action) => {
            this._spinner.show();
            this.PostService.getAllCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppGetCategoriesSuccess(payload));
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
    getCategoriesSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_CATEGORIES_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getJobs$ = this.actions$
        .ofType('APP_GET_JOBS')
        .do((action) => {
            this._spinner.show();
            this.PostService.getAllJobs(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    /* let payload = {
                        jobs: result.data,
                        currentPage: action.payload.currentPage,
                        limit: action.payload.limit,
                        count: result.data.count
                    }; */
                    let payload = result.data;
                    this.store.dispatch(new post.AppGetJobsSuccess(payload));
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
        .ofType('APP_GET_JOBS_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getJob$ = this.actions$
        .ofType('APP_GET_JOB')
        .do((action) => {
            this._spinner.show();
            this.PostService.getJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data[0];
                    this.store.dispatch(new post.AppGetJobSuccess(payload));
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
        .ofType('APP_GET_JOB_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getLabors$ = this.actions$
        .ofType('APP_GET_LABORS')
        .do((action) => {
            this._spinner.show();
            this.PostService.getLabors(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppGetLaborsSuccess(payload));
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
        .ofType('APP_GET_SUB_CATEGORIES')
        .do((action) => {
            this._spinner.show();
            this.PostService.getAllSubCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppGetSubCategoriesSuccess(payload));
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
        .ofType('APP_GET_SUB_CATEGORIES_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    postJob$ = this.actions$
        .ofType('APP_POST_JOB')
        .do((action) => {
            this._spinner.show();
            this.PostService.postJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppPostJobSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Job posted successfully', 'Success');
                    this.router.navigate(['/pages/posts/allposts']);
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

    @Effect({ dispatch: false })
    editPost$ = this.actions$
        .ofType('APP_EDIT_POST')
        .do((action) => {
            this._spinner.show();
            this.PostService.editPost(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppPostJobSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Job updated successfully', 'Success');
                    this.router.navigate(['/pages/posts/allposts']);
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
    editPostSuccess: Observable<Action> = this.actions$
        .ofType('APP_EDIT_POST_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    hireLabor$ = this.actions$
        .ofType('APP_HIRE_LABOR')
        .do((action) => {
            this._spinner.show();
            this.PostService.hireLabor(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppHireLaborSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Labor hired successfully', 'Success');
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
    hireLaborSuccess: Observable<Action> = this.actions$
        .ofType('APP_HIRE_LABOR_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_LABORS, payload: {
                    jobId: this.dataService.getData('jobId')
                }
            });
        });

    @Effect({ dispatch: false })
    rejectLabor$ = this.actions$
        .ofType('APP_REJECT_LABOR')
        .do((action) => {
            this._spinner.show();
            this.PostService.rejectLabor(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppRejectLaborSuccess(payload));
                    this.toastrService.clear();
                    this.toastrService.success(result.message || 'Labor rejected successfully', 'Success');
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
    rejectLaborSuccess: Observable<Action> = this.actions$
        .ofType('APP_REJECT_LABOR_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_LABORS, payload: {
                    jobId: this.dataService.getData('jobId')
                }
            });
        });

    @Effect({ dispatch: false })
    cancelJob$ = this.actions$
        .ofType('APP_CANCEL_POST')
        .do((action) => {
            this._spinner.show();
            this.PostService.cancelJob(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200 || result.statusCode == 201) {
                    let payload = result.data;
                    this.store.dispatch(new post.AppCancelJobSuccess(payload));
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
        .ofType('APP_CANCEL_POST_SUCCESS')
        .do((action) => {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'ACTIVE'
                }
            });
        });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private PostService: PostService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner,
        private dataService: DataService
    ) { }

}

