import { get } from 'lodash';
import { Injectable, VERSION } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user-service/user.service';
import { ChangePasswordService } from '../../../services/change-password/change-password.service';
import { BaThemeSpinner } from '../../theme/services';
const types = ['success', 'error', 'info', 'warning'];
import { Router } from '@angular/router';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
import * as pass from './change-password-modal.action';

@Injectable()
export class ChangePasswordEffects {
    private lastInserted: number[] = [];
    options: ToastrConfig;
    title = '';
    // type = types[0];
    message = '';

    @Effect({ dispatch: false })
    changePassword: Observable<Action> = this.actions$
        .ofType(pass.actionTypes.CHANGE_PASSWORD)
        .do((action) => {
            this.ChangePasswordService
                .changePassword(action.payload)
                .subscribe((result) => {
                    if (result.message == 'Success') {
                        let m = ' Password Updated';
                        let t = '';
                        const opt = cloneDeep(this.options);
                        this.toastrService.clear();
                        const inserted = this.toastrService[types[0]](m, t, opt);
                        if (inserted) {
                            this.lastInserted.push(inserted.toastId);
                        }

                        this.store.dispatch({
                            type: pass.actionTypes.CHANGE_PASSWORD_SUCCESS,
                            payload: result
                        });


                    }
                }, (error) => {

                    let m = error.message;
                    let t = 'Password is incorrect';
                    const opt = cloneDeep(this.options);
                    this.toastrService.clear();
                    const inserted = this.toastrService[types[1]](m, t, opt);
                    if (inserted) {
                        this.lastInserted.push(inserted.toastId);
                    }
                });



        });

    @Effect({ dispatch: false })
    ChangePasswordSuccess$ = this.actions$
        .ofType(pass.actionTypes.CHANGE_PASSWORD_SUCCESS)
        .do((action) => {
        });

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private ChangePasswordService: ChangePasswordService,
        private activeModal: NgbActiveModal,
        private router: Router,
        private toastrService: ToastrService
    ) {



    }
}