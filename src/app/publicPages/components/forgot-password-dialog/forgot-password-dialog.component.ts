import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'style-loader!./forgot-password-dialog.scss';

@Component({
    selector: 'forgot-password-dialog',
    template: `
        <md-dialog-content>
            <div class="forgot-block">
                <div class="forgot-block-inner">
                    <div style="width: 100%; text-align: center; margin-bottom: 25px">
                        <img class="image" src="assets/img/lock2.png">
                    </div>
                    <div style="width: 100%; text-align: center">
                        <h2 *ngIf="!forgetSuccess" class="title">
                            Forgot Password?
                        </h2>
                        <h2 *ngIf="forgetSuccess" class="title">
                            Verification Code
                        </h2>
                    </div>
                </div>
                <div class="forgot-block-message">
                    <span *ngIf="!forgetSuccess" style="color: #777777">
                        Please enter your registered phone number / email id so that we can help you out with resetting your password.
                    </span>
                    <span *ngIf="forgetSuccess" style="color: #777777">
                        Enter the verification code sent to {{emailOrPhone}} via SMS.
                    </span>
                </div>
                <div class="forgot-block-inner">
                    <div style="text-align: center">
                        <input *ngIf="!forgetSuccess" type="text" class="form-control" id="inputUser" [(ngModel)]="emailOrPhone" placeholder="Phone Number / Email">
                        <input *ngIf="forgetSuccess" type="text" class="form-control" id="inputOtp" [(ngModel)]="otp" placeholder="OTP" maxlength="4" (keypress)="_keyPressNumber($event)">
                    </div>
                    <div class="form-action-btn form-action-btns">
                        <div class="form-group row">
                            <div class="col-12 col-sm-12">
                                <button *ngIf="!forgetSuccess" md-raised-button type="button" color="primary" class="btn btn-warning btn-block btn-login" (click)="forgotPassword()">RESET PASSWORD</button>
                                <button *ngIf="forgetSuccess" md-raised-button type="button" color="primary" class="btn btn-warning btn-block btn-login" (click)="confirmOtp()">CONFIRM</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ForgotPasswordDialog {

    forgetSuccess: boolean;
    data;
    storeData;
    emailOrPhone;
    otp;

    constructor(public dialog: MdDialog,
        private store: Store<any>,
        private toastrService: ToastrService) {
        this.forgetSuccess = false;
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                console.log(res);
                if (res && res.forgotPass && res.forgotPass.statusCode) {
                    // this.dialog.closeAll();
                    // this.forgetSuccess = true;
                }
            });
    }

    ngOnInit() {
        this.forgetSuccess = false;
    }

    ngOnDestroy() {
        if (this.storeData) {
            // this.storeData.unsubscribe();
        }
    }

    forgotPassword() {
        if(!this.emailOrPhone) {
            this.toastrService.clear();
            this.toastrService.error('Please enter email or phone number', 'Error');
            return;
        }
        this.store.dispatch({
            type: auth.actionTypes.AUTH_FORGOT_PASSWORD,
            payload: this.emailOrPhone
        });
    }

    confirmOtp() {
        if(!this.otp) {
            this.toastrService.clear();
            this.toastrService.error('Please enter verification code', 'Error');
            return;
        }
        console.log('verify');
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}



