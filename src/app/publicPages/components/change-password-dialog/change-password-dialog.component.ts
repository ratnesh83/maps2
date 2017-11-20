import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'style-loader!./change-password-dialog.scss';

@Component({
    selector: 'change-password-dialog',
    template: `
        <md-dialog-content>
            <div class="forgot-block">
                <div class="forgot-block-inner">
                    <div style="width: 100%; text-align: center; margin-bottom: 25px">
                        <img class="image" src="assets/img/lock2.png">
                    </div>
                    <div style="width: 100%; text-align: center">
                        <h2 class="title">
                            New Password
                        </h2>
                    </div>
                </div>
                <div class="forgot-block-message">
                    <span style="color: #777777">
                    </span>
                </div>
                <div class="forgot-block-inner">
                    <form [formGroup]="form">
                        <div class="form-group" style="text-align: center; position: relative">
                            <input (focus)="hidePassword()" type="{{passwordType}}" [formControl]="password" class="form-control" id="inputNewPassword" placeholder="Enter New Password">
                            <i *ngIf="passwordType == 'password' && password.value" (click)="showPassword()" class="fa fa-eye show-hide-password"></i>
                        </div>
                        <div class="form-group" style="text-align: center; position: relative">
                            <input (focus)="hidePassword()" type="{{repeatPasswordType}}" [formControl]="repeatPassword" class="form-control" id="inputConfirmPassword" placeholder="Confirm New Password">
                            <i *ngIf="repeatPasswordType == 'password' && repeatPassword.value" (click)="showRepeatPassword()" class="fa fa-eye show-hide-password"></i>
                        </div>
                        <div class="form-action-btn form-action-btns">
                            <div class="form-group row">
                                <div class="col-12 col-sm-12">
                                    <button md-raised-button type="button" color="primary" class="btn btn-warning btn-block btn-login" (click)="submit()">SAVE PASSWORD</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ChangePasswordDialog {

    data;
    storeData;
    resetToken;
    form: FormGroup;
    passwords: FormGroup;
    password: AbstractControl;
    repeatPassword: AbstractControl;
    passwordType;
    repeatPasswordType;

    constructor(public dialog: MdDialog,
        private fb: FormBuilder,
        private store: Store<any>,
        private toastrService: ToastrService) {
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res && res.forgotPassOtp && res.forgotPassOtp.statusCode && res.forgotPassOtp.statusCode == 200) {
                    if (res.forgotPassOtp.data && res.forgotPassOtp.data.otp != undefined) {
                        this.resetToken = res.forgotPassOtp.data.otp;
                    }
                }
            });
        this.form = fb.group({
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required])],
                'repeatPassword': ['', Validators.compose([Validators.required])]
            }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
        });
        this.passwords = <FormGroup>this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
        this.passwordType = 'password';
        this.repeatPasswordType = 'password';
    }

    ngOnDestroy() {
        if (this.storeData) {
            // this.storeData.unsubscribe();
        }
    }

    showPassword() {
        this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
        this.repeatPasswordType = 'password';
    }

    showRepeatPassword() {
        this.repeatPasswordType = this.repeatPasswordType == 'password' ? 'text' : 'password';
        this.passwordType = 'password';
    }

    hidePassword() {
        this.passwordType = 'password';
        this.repeatPasswordType = 'password';
    }

    submit() {
        this.hidePassword();
        if (!this.password.value) {
            this.toastrService.clear();
            this.toastrService.error('Password is required', 'Error');
            return;
        }
        if (this.passwords.errors && this.passwords.errors.passwordsEqual && !this.passwords.errors.passwordsEqual.valid) {
            this.toastrService.clear();
            this.toastrService.error('Passwords do not match', 'Error');
            return;
        }
        if (this.data) {
            this.store.dispatch({
                type: auth.actionTypes.AUTH_RESET_PASSWORD,
                payload: {
                    resetToken: this.data,
                    password: this.password.value
                }
            });
        } else {
            this.store.dispatch({
                type: auth.actionTypes.AUTH_RESET_PASSWORD,
                payload: {
                    resetOtp: this.resetToken,
                    password: this.password.value
                }
            });
        }
    }

}



