import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
const types = ['success', 'error', 'info', 'warning'];
import { SettingsService } from '../../../services/settings/settings.service';
import * as settings from './help-center.actions';
import * as app from '../../../state/app.actions';

@Injectable()
export class SettingsEffects {
    private lastInserted: number[] = [];
    options: ToastrConfig;
    title = '';
    message = '';

    // GET Driver DETAIL
    @Effect({ dispatch: false })
    showDriverDetail: Observable<Action> = this.actions$
        .ofType('SETTINGS_KEY_MESSAGE')
        .do((action) => {
            this.SettingsService
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
                            type: settings.actionTypes.SETTINGS_KEY_MESSAGE_SUCCESS,
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


    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private router: Router,
        private SettingsService: SettingsService,
        private toastrService: ToastrService
    ) { }

}

