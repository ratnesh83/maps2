import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
const types = ['success', 'error', 'info', 'warning'];
import * as subscription from './subscription.actions';
import * as app from '../../../state/app.actions';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../../../theme/services';

@Injectable()
export class SubscriptionEffects {
    private lastInserted: number[] = [];
    options: ToastrConfig;
    title = '';
    message = '';

    @Effect({ dispatch: false })
    getAllSubscriptions$ = this.actions$
        .ofType('APP_GET_ALL_SUBSCRIPTIONS')
        .do((action) => {
            if (action.payload && action.payload.subscription) {
                this._spinner.hide();
            } else {
                this._spinner.show();
            }
            this.SubscriptionService.getAllSubscriptions(action.payload).subscribe((result) => {
                this._spinner.hide();
                if (result.message == 'Success') {
                    let filters = (action.payload.filter) ? action.payload.filter : null;
                    let payload = {
                        subscriptions: result.data.subscriptionData,
                        count: result.data.count,
                        currentPage: action.payload.currentPage,
                        limit: action.payload.limit,
                        filter: filters
                    };
                    this.store.dispatch(new subscription.AppGetAllSubscriptionsSuccess(payload));
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
                            type: subscription.actionTypes.SUBSCRIPTION_ERROR, payload: error
                        });
                    }
                }
            );
        });

    @Effect({ dispatch: false })
    getSubscriptionsSuccess: Observable<Action> = this.actions$
        .ofType('APP_GET_ALL_SUBSCRIPTIONS_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    addSubscription$ = this.actions$
        .ofType('ADD_SUBSCRIPTION')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].subscription;
            this.SubscriptionService
                .addSubscription(action.payload.formData)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS, payload: {
                                currentPage: state.currentPage,
                                limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter,
                                applicableFor: action.payload.applicableFor
                            }
                        });
                        this.store.dispatch({
                            type: subscription.actionTypes.ADD_SUBSCRIPTION_SUCCESS
                        });
                        let message = 'Subscription added';
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
                        this.store.dispatch({
                            type: subscription.actionTypes.SUBSCRIPTION_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    addSubscriptionSuccess: Observable<Action> = this.actions$
        .ofType('ADD_SUBSCRIPTION_SUCCESS')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    editSubscription$ = this.actions$
        .ofType('EDIT_SUBSCRIPTION')
        .withLatestFrom(this.store)
        .do((storeState) => {

            let action = storeState[0];
            let state = storeState[1].subscription;

            this.SubscriptionService
                .updateSubscription(action.payload.formData)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS, payload: {
                                currentPage: state.currentPage,
                                limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter,
                                applicableFor: action.payload.applicableFor
                            }
                        });
                        this.store.dispatch({ type: subscription.actionTypes.EDIT_SUBSCRIPTION_SUCCESS });
                        let message = 'Subscription updated';
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
                        this.store.dispatch({
                            type: subscription.actionTypes.SUBSCRIPTION_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    editSubscriptionSuccess$ = this.actions$
        .ofType('EDIT_SUBSCRIPTION_SUCCESS')
        .do((action) => {
        });

    @Effect({ dispatch: false })
    blockSubscriptionConfirm$ = this.actions$
        .ofType('BLOCK_SUBSCRIPTION_CONFIRM')
        .do((action) => {

        });

    @Effect({ dispatch: false })
    blockSubscription$ = this.actions$
        .ofType('BLOCK_SUBSCRIPTION')
        .withLatestFrom(this.store)
        .do((storeState) => {
            let action = storeState[0];
            let state = storeState[1].subscription;
            this._spinner.show();
            this.SubscriptionService
                .blockSubscription(action.payload.blockId)
                .subscribe((result) => {
                    this._spinner.hide();
                    if (result.message == 'Success') {
                        this.store.dispatch({
                            type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS, payload: {
                                currentPage: state.currentPage,
                                limit: state.limit,
                                role: action.payload.role,
                                filter: state.filter,
                                applicableFor: action.payload.blockId.applicableFor
                            }
                        });
                    }

                    let message;
                    let title = 'Success';
                    if (action.payload.blockId && action.payload.blockId.isDeleted == true) {
                        message = 'Subscription blocked';
                    } else {
                        message = 'Subscription unblocked';
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
                        this.store.dispatch({
                            type: subscription.actionTypes.SUBSCRIPTION_ERROR, payload: error
                        });
                    }
                });
        });

    @Effect({ dispatch: false })
    errorSubscription$ = this.actions$
        .ofType('SUBSCRIPTION_ERROR')
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
        private SubscriptionService: SubscriptionService,
        private toastrService: ToastrService,
        private _spinner: BaThemeSpinner
    ) { }

}

