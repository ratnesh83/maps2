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
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: feedback.actionTypes.GET_FEEDBACKS_SUCCESS,
                            payload: result
                        });
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: feedback.actionTypes.FEEDBACK_ERROR, payload: error
                        });
                    }
                });
        });
    @Effect({ dispatch: false })
    getFeedbacksSuccess: Observable<Action> = this.actions$
        .ofType('GET_FEEDBACKS_SUCCESS')
        .do((action) => {
        });
    @Effect({ dispatch: false })
    searchFeedbacks$ = this.actions$
        .ofType('SEARCH_FEEDBACKS')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].feedback;
            this.FeedbackService
                .getAllFeedbacks(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        let filters = (action.payload.filter) ? action.payload.filter : null;
                        if (result.data.count == 0) {
                            let payload = {
                                feedbacks: result.data.feedbacks,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };
                            this.store.dispatch({
                                type: feedback.actionTypes.SEARCH_FEEDBACKS_SUCCESS, payload: payload
                            });
                        } else {
                            let payload = {
                                feedbacks: result.data.feedbacks,
                                count: result.data.count,
                                currentPage: action.payload.currentPage,
                                limit: action.payload.limit,
                                filter: filters
                            };
                            this.store.dispatch({
                                type: feedback.actionTypes.SEARCH_FEEDBACKS_SUCCESS, payload: payload
                            });
                        }
                    }
                }, (error) => {
                    this._spinner.hide();
                    if (error.statusCode === 401 || error.statusCode === 403) {
                        this.store.dispatch({
                            type: app.actionTypes.APP_AUTHENTICATION_FAIL, payload: error
                        });
                    } else {
                        this.store.dispatch({
                            type: feedback.actionTypes.FEEDBACK_ERROR, payload: error
                        });
                    }
                });
        });
    @Effect({ dispatch: false })
    searchFeedbackSuccess: Observable<Action> = this.actions$
        .ofType('SEARCH_FEEDBACKS_SUCCESS')
        .do((action) => {
        });
    @Effect({ dispatch: false })
    errorJob$ = this.actions$
        .ofType('FEEDBACK_ERROR')
        .do((action) => {
            this._spinner.hide();
            let message = action.payload.message;
            let title = 'Error';
            this.toastrService.clear();
            this.toastrService.error(message, title);
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