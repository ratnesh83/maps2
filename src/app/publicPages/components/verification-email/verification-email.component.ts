import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { DataService } from '../../../services/data-service/data.service';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BaThemeSpinner } from '../../../theme/services';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { EmailValidator } from '../../../theme/validators';
import { User } from '../../../auth/model/user.model';
import { ChangeEmailDialog } from '../change-email-dialog/change-email-dialog.component';
import { ApprovalDialog } from '../approval-dialog/approval-dialog.component';
import 'style-loader!./verification-email.scss';

@Component({
    selector: 'verification-email',
    templateUrl: './verification-email.html',
})

export class VerificationEmail {

    @ViewChild('inputCodeOne') public _inputCodeOne: ElementRef;
    @ViewChild('inputCodeTwo') public _inputCodeTwo: ElementRef;
    @ViewChild('inputCodeThree') public _inputCodeThree: ElementRef;
    @ViewChild('inputCodeFour') public _inputCodeFour: ElementRef;

    public storeData;
    public form: FormGroup;
    public codeOne: AbstractControl;
    public codeTwo: AbstractControl;
    public codeThree: AbstractControl;
    public codeFour: AbstractControl;
    public submitted: boolean = false;
    public userId;
    public selectedEmail;

    public roles = [
        { value: 'admin', display: 'Admin' },
        { value: 'customer', display: 'Customer' },
        { value: 'serviceProvider', display: 'Service Provider' },
        { value: 'driver', display: 'Driver' }
    ];

    constructor(private fb: FormBuilder,
        private baThemeSpinner: BaThemeSpinner,
        private store: Store<any>,
        private toastrService: ToastrService,
        private renderer: Renderer,
        private dialog: MdDialog,
        private dataService: DataService
    ) {
        this.selectedEmail = 'dev@mail.com';
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res && res.userDetails) {
                    console.log(res.userDetails);
                    this.selectedEmail = res.userDetails.email;
                }
                if (res && res.changeEmail && res.changeEmail.statusCode && res.changeEmail.statusCode == 200) {
                    this.dialog.closeAll();
                }
                if (res && res.confirmOtpSignup && res.confirmOtpSignup.statusCode && res.confirmOtpSignup.statusCode == 200) {
                    this.openApprovalDialog();
                }
            });

        this.form = fb.group({
            'codeOne': ['', Validators.compose([Validators.required])],
            'codeTwo': ['', Validators.compose([Validators.required])],
            'codeThree': ['', Validators.compose([Validators.required])],
            'codeFour': ['', Validators.compose([Validators.required])]
        });

        this.codeOne = this.form.controls['codeOne'];
        this.codeTwo = this.form.controls['codeTwo'];
        this.codeThree = this.form.controls['codeThree'];
        this.codeFour = this.form.controls['codeFour'];
    }

    ngOnInit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
        // this.store.dispatch({ type: auth.actionTypes.AUTH_GET_USER_DETAILS });
    }

    ngOnDestroy() {
        if (this.storeData) {
            //this.storeData.unsubscribe();
        }
    }

    resendVerificationCode() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
        let data = {
            userId: this.userId,
            sendVia: 'EMAIL'
        };
        this.store.dispatch({
            type: auth.actionTypes.AUTH_RESEND_OTP,
            payload: data
        });
    }

    goto(id) {
        switch (id) {
            case 'inputCodeOne':
                if (this._inputCodeOne) {
                    this._inputCodeOne.nativeElement.focus();
                }
                break;
            case 'inputCodeTwo':
                if (this._inputCodeTwo) {
                    this._inputCodeTwo.nativeElement.focus();
                }
                break;
            case 'inputCodeThree':
                if (this._inputCodeThree) {
                    this._inputCodeThree.nativeElement.focus();
                }
                break;
            case 'inputCodeFour':
                if (this._inputCodeFour) {
                    this._inputCodeFour.nativeElement.focus();
                }
                break;
            default: break;
        }
    }

    openChangeDialog() {
        let dialogRef = this.dialog.open(ChangeEmailDialog);
        // dialogRef.disableClose = true;
        dialogRef.componentInstance.data = this.dataService.getUserRegisterationId();
    }

    openApprovalDialog() {
        let dialogRef = this.dialog.open(ApprovalDialog);
        dialogRef.disableClose = true;
        dialogRef.componentInstance.data = this.dataService.getUserRegisterationId();
    }

    onSubmit() {

        this.submitted = true;
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
        if (!this.codeOne.value) {
            this.toastrService.clear();
            this.toastrService.error('Verification code is required', 'Error');
            if (this._inputCodeOne) {
                this._inputCodeOne.nativeElement.focus();
            }
            return;
        }
        if (!this.codeTwo.value) {
            this.toastrService.clear();
            this.toastrService.error('Verification code is required', 'Error');
            if (this._inputCodeTwo) {
                this._inputCodeTwo.nativeElement.focus();
            }
            return;
        }
        if (!this.codeThree.value) {
            this.toastrService.clear();
            this.toastrService.error('Verification code is required', 'Error');
            if (this._inputCodeThree) {
                this._inputCodeThree.nativeElement.focus();
            }
            return;
        }
        if (!this.codeFour.value) {
            this.toastrService.clear();
            this.toastrService.error('Verification code is required', 'Error');
            if (this._inputCodeFour) {
                this._inputCodeFour.nativeElement.focus();
            }
            return;
        }
        let otp = this.codeOne.value + this.codeTwo.value + this.codeThree.value + this.codeFour.value;
        let data = {
            userId: this.userId,
            otp: otp
        };
        this.store.dispatch({
            type: auth.actionTypes.AUTH_CONFIRM_OTP_SIGNUP,
            payload: data
        });

    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    _keyPressOtpNumber(event: any, input) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        } else {
            event.target.value = null;
            if (input) {
                this.goto(input);
            }
        }
    }

}
