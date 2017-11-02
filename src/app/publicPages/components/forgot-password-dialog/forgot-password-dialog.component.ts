import { Component } from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { EmailValidator, CountryCodeValidator } from '../../../theme/validators';
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
                        Enter the verification code sent to {{ emailOrPhone.value }} via SMS.
                    </span>
                </div>
                <div class="forgot-block-inner">
                    <div style="text-align: center">
                        <form [formGroup]="form">
                            <input *ngIf="!forgetSuccess" type="text" class="form-control" id="inputUser" [formControl]="emailOrPhone" placeholder="Phone Number / Email">
                        </form>
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
    form: FormGroup;
    storeData;
    emailOrPhone: AbstractControl;
    otp;

    constructor(public dialog: MdDialog,
        private fb: FormBuilder,
        private store: Store<any>,
        private toastrService: ToastrService) {
        this.forgetSuccess = false;
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res && res.forgotPass && res.forgotPass.statusCode && res.forgotPass.statusCode == 200) {
                    this.forgetSuccess = true;
                }
            });
        this.form = fb.group({
            'emailOrPhone': ['', Validators.compose([Validators.required, EmailValidator.email, CountryCodeValidator.phoneNumberFull])]
        });
        this.emailOrPhone = this.form.controls['emailOrPhone'];
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
        if (!this.emailOrPhone.value) {
            this.toastrService.clear();
            this.toastrService.error('Please enter email or phone number', 'Error');
            return;
        }
        if(this.emailOrPhone.errors && this.emailOrPhone.errors) {
            if(this.emailOrPhone.errors.invalidPhoneNumber && this.emailOrPhone.errors.invalidEmail) {
                this.toastrService.clear();
                this.toastrService.error('Please enter a valid email or phone number', 'Error');
                return;
            }
        }
        this.store.dispatch({
            type: auth.actionTypes.AUTH_FORGOT_PASSWORD,
            payload: this.emailOrPhone.value
        });
    }

    confirmOtp() {
        if (!this.otp) {
            this.toastrService.clear();
            this.toastrService.error('Please enter verification code', 'Error');
            return;
        }
        this.store.dispatch({
            type: auth.actionTypes.AUTH_FORGOT_PASSWORD_OTP,
            payload: {
                otp: this.otp,
                phoneNumber: this.emailOrPhone.value
            }
        });
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}



