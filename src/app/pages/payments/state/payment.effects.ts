import { get } from 'lodash';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
/* import { paymentService } from '../../../services/payment-service/payment.service'; */
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { SettingsService } from '../../../services/settings/settings.service';


import { cloneDeep, random } from 'lodash';
const types = ['success', 'error', 'info', 'warning'];
import * as payment from './payment.actions';
import * as app from '../../../state/app.actions';
import { setting } from '../../settings/state/setting.reducers';
import { BaThemeSpinner } from '../../../theme/services';
import { DonationsService } from '../../../services/donations-service/donations.service';
import { SubscriptionService } from '../../../services/subscription/subscription.service';

@Injectable()
export class PaymentEffects {
    options: ToastrConfig;
    private lastInserted: number[] = [];


    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private SettingsService: SettingsService,
        private SubscriptionService: SubscriptionService,
        private DonationsService: DonationsService,
        private router: Router,
        private _spinner: BaThemeSpinner,
        /* private paymentService: paymentService, */
        private toastrService: ToastrService
    ) { }

    @Effect({ dispatch: false })
    addDefaultCard$ = this.actions$
        .ofType('ADD_CARD')
        .do((action) => {
            this.SettingsService.addCard(action.payload.data).subscribe((result) => {
                if (result.statusCode == 200) {
                    this.store.dispatch({ type: payment.actionTypes.GET_CARDS });
                    let m = 'card added successfully';
                    let t = 'success';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[0]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    return inserted;
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                    }
                    this._spinner.hide();
                    let m = error.message;
                    let t = 'error';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[1]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    return inserted;
                }
            );
        });

    @Effect({ dispatch: false })
    getCards$ = this.actions$
        .ofType('GET_CARDS')
        .do((action) => {
            this.SettingsService.getCards(action.payload).subscribe((result) => {
                if (result.statusCode == 200) {
                    let payload = result.data;
                    this.store.dispatch(new payment.GetCardsSuccessAction(payload));
                    this._spinner.hide();
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                    }
                    this._spinner.hide();
                    let m = error.message;
                    let t = 'error';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[1]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    return inserted;
                }
            );
        });
    @Effect({ dispatch: false })
    payment$ = this.actions$
        .ofType('PAYMENT')
        .do((action) => {
            if (action.payload.payFor == 'donation') {
                this.DonationsService.donate(action.payload.data).subscribe((result) => {
                    if (result.statusCode == 201) {
                        this.router.navigate(['/pages/donations']);
                        localStorage.removeItem('payamount');
                        let m = 'donated $' + result.data.amount + ' successfully';
                        let t = 'Success';
                        const opt = cloneDeep(this.options);
                        const inserted = this.toastrService[types[0]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
                        return inserted;
                    }
                }
                    , (error) => {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                        }
                        this._spinner.hide();
                        let m = error.message;
                        let t = 'error';
                        const opt = cloneDeep(this.options);
                        const inserted = this.toastrService[types[1]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
                        return inserted;
                    }
                );
            }
            if (action.payload.payFor == 'plan') {
                this.SubscriptionService.buyPlan(action.payload.data).subscribe((result) => {
                    if (result.statusCode == 200) {
                        this.router.navigate(['/pages/subscriptions']);
                        localStorage.removeItem('pay');
                        let m = 'plan opted successfully';
                        let t = 'Success';
                        const opt = cloneDeep(this.options);
                        const inserted = this.toastrService[types[0]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
                        return inserted;
                    }
                }
                    , (error) => {
                        if (error.statusCode === 401 || error.statusCode === 403) {
                        }
                        this.router.navigate(['/pages/subscriptions']);
                        localStorage.removeItem('pay');
                        this._spinner.hide();
                        let m = error.message;
                        let t = 'error';
                        const opt = cloneDeep(this.options);
                        const inserted = this.toastrService[types[1]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }
                        return inserted;
                    }
                );
            }
        });
    @Effect({ dispatch: false })
    deleteCard$ = this.actions$
        .ofType('DELETE_CARD')
        .do((action) => {
            this.DonationsService.deleteCard(action.payload).subscribe((result) => {
                if (result.statusCode == 200) {
                    this.store.dispatch({ type: payment.actionTypes.GET_CARDS });
                    let m = 'card deleted successfully';
                    let t = 'success';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[0]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    return inserted;
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                    }
                    this._spinner.hide();
                    let m = error.message;
                    let t = 'error';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[1]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    return inserted;
                }
            );
        });
    @Effect({ dispatch: false })
    setAsDefault$ = this.actions$
        .ofType('SET_AS_DEFAULT')
        .do((action) => {
            this.DonationsService.setAsDefault(action.payload).subscribe((result) => {
                if (result.statusCode == 200) {
                    this.store.dispatch({ type: payment.actionTypes.GET_CARDS });
                    let m = 'Card is set to default';
                    let t = 'sucess';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[0]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    return inserted;
                }
            }
                , (error) => {
                    if (error.statusCode === 401 || error.statusCode === 403) {
                    }
                    this._spinner.hide();
                    let m = error.message;
                    let t = 'error';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[1]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                    return inserted;
                }
            );
        });
}



