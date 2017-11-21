import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import { JobService } from '../../../services/job-service/job.service';
import * as job from './job.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';


@Injectable()
export class JobEffects {

    @Effect({ dispatch: false })
    getCategories$ = this.actions$
        .ofType('APP_GET_CATEGORIES_JOB')
        .do((action) => {
            this._spinner.show();
            this.JobService.getAllCategories(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new job.AppGetCategoriesSuccess(payload));
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
        .ofType('APP_GET_CATEGORIES_JOB_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    getAllJobs$ = this.actions$
        .ofType('APP_GETALL_JOB')
        .do((action) => {
            this._spinner.show();
            this.JobService.getAllJobs(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Action complete.' || result.statusCode == 200) {
                    let filters = (action.payload.filter) ? action.payload.filter : null;
                    let payload = {
                        jobs: result.data,
                        count: result.data.length
                    };
                    this.store.dispatch(new job.AppJobDetailSuccess(payload));
                    this.toastrService.clear();
                    if (payload.count == 0) {
                        this.toastrService.warning(payload.count > 1 ? payload.count + ' jobs found' : payload.count == 0 ? 'No jobs found in this area' : '1 job found', 'Success');
                    } else {
                        this.toastrService.info(payload.count > 1 ? payload.count + ' jobs found' : payload.count == 0 ? 'No jobs found in this area' : '1 job found', 'Success');
                    }
                }
            }
                , (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });

                    } else {

                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getAllJobsConsumed: Observable<Action> = this.actions$
        .ofType('APP_JOB_DETAIL_SUCCESS_CONSUMED')
        .do((action) => {
            this.store.dispatch(new job.AppJobDetailSuccessConsumed(action.payload));
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

