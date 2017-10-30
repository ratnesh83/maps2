import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BaThemeSpinner } from '../../../theme/services';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { EmailValidator } from '../../../theme/validators';
import { User } from '../../../auth/model/user.model';
import { ChangeEmailDialog } from '../change-email-dialog/change-email-dialog.component';
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
    public selectedEmail;

    public roles = [
        { value: 'admin', display: 'Admin' },
        { value: 'customer', display: 'Customer' },
        { value: 'serviceProvider', display: 'Service Provider' },
        { value: 'driver', display: 'Driver' }
    ];

    constructor(fb: FormBuilder,
        private baThemeSpinner: BaThemeSpinner,
        private store: Store<any>,
        private toastrService: ToastrService,
        private renderer: Renderer,
        public dialog: MdDialog
    ) {
        this.selectedEmail = 'dev@mail.com';
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {

            });

        this.form = fb.group({
            'codeOne': [''],
            'codeTwo': [''],
            'codeThree': [''],
            'codeFour': ['']
        });

        this.codeOne = this.form.controls['codeOne'];
        this.codeTwo = this.form.controls['codeTwo'];
        this.codeThree = this.form.controls['codeThree'];
        this.codeFour = this.form.controls['codeFour'];
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.storeData) {
            this.storeData.unsubscribe();
        }
    }

    resendVerificationCode() {

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
        dialogRef.componentInstance.data = 'sa';
    }

    onSubmit(values: Object, event) {

        console.log(values);

        this.submitted = true;

        if (this.form.valid) {
            let data = {
                email: values,
                password: values,
                rememberMe: values,
                role: values,
                deviceType: 'WEB'
            };
        } else {
            //console.log('form is not valid ');
        }
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
