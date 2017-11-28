import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
const types = ['success', 'error', 'info', 'warning'];
import { DonationsService } from '../../../services/donations-service/donations.service';
import * as donation from './donation.actions';
import * as app from '../../../state/app.actions';

@Injectable()
export class DonationsEffects {
    private lastInserted: number[] = [];
    options: ToastrConfig;
    title = '';
    message = '';

    // GET Driver DETAIL
    @Effect({ dispatch: false })
    showDriverDetail: Observable<Action> = this.actions$
        .ofType('SETTINGS_KEY_MESSAGE')
        .do((action) => {
            this.DonationsService
                .addThisKey(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        let m = ' Key-Value Added';
                        let t = '';
                        const opt = cloneDeep(this.options);
                        const inserted = this.toastrService[types[0]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }

                        this.store.dispatch({
                            type: donation.actionTypes.SETTINGS_KEY_MESSAGE_SUCCESS,
                            payload: result
                        });


                    }
                }, (error) => {

                    let m = error.message;
                    let t = 'Value not added';
                    const opt = cloneDeep(this.options);
                    const inserted = this.toastrService[types[1]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                });




        });

        @Effect({dispatch: false})
        getProfileInfo$ = this.actions$
          .ofType('GET_DONATIONS')
          .do((action) => {
            this.DonationsService.getDonations(action.payload).subscribe((result) => {
                if (result.statusCode == 200) {
                  let payload = result.data;
                  this.store.dispatch(new donation.GetDonationsSuccessAction(payload));            
                }
              }
              , (error) => {
                if (error.statusCode === 401 || error.statusCode === 403) {
                }
              }
            );
          });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private DonationsService: DonationsService,
        private toastrService: ToastrService
    ) { }

}

