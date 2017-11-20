import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import { FeedbackService } from '../../../services/feedback-service/feedback.service';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';
import * as feedback from './feedback.actions';
import * as app from '../../../state/app.actions';

@Injectable()
export class FeedbackEffects {
    @Effect({ dispatch: false })
    getFeedbacks: Observable<Action> = this.actions$
        .ofType('GET_FEEDBACKS')
        .do((action) => {
            this._spinner.show();
            this.FeedbackService
                .getAllFeedbacks(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success' || result.statusCode == 200) {
                        this.store.dispatch({
                            type: feedback.actionTypes.GET_FEEDBACKS_SUCCESS,
                            payload: {
                                feedbacks: result.data
                            }
                        });
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.toastrService.clear();
                        this.toastrService.error(error.message || 'Something went wrong', 'Error');
                    }
                });
        });

    @Effect({ dispatch: false })
    getFeedbacksSuccess: Observable<Action> = this.actions$
        .ofType('GET_FEEDBACKS_SUCCESS')
        .do((action) => {
        });
    
    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private FeedbackService: FeedbackService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }
}