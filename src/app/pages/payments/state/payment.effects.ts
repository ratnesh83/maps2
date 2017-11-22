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

@Injectable()
export class PaymentEffects {

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private SettingsService: SettingsService,        
        private router: Router,
        /* private paymentService: paymentService, */
        private toastrService: ToastrService
    ) { }

    @Effect({dispatch: false})
    addDefaultCard$ = this.actions$
      .ofType('ADD_CARD')
      .do((action) => {
          console.log(action.payload);
        this.SettingsService.addCard(action.payload.data).subscribe((result) => {
            if (result.statusCode == 200) {
            }
          }
          , (error) => {
            if (error.statusCode === 401 || error.statusCode === 403) {
       
            }
          }
        );
      });

}

