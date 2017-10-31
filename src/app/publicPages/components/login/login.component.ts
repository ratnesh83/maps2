import { Component } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { ForgotPasswordDialog } from '../forgot-password-dialog/forgot-password-dialog.component';
import 'style-loader!./login.scss';

declare const FB: any;

@Component({
    selector: 'login',
    templateUrl: './login.html',
})

export class Login {

    public storeData;
    public form: FormGroup;
    public email: AbstractControl;
    public role: AbstractControl;
    public checkboxRemember: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;
    public countryCode: AbstractControl;
    public countryCodes = [];

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
        private iconRegistry: MdIconRegistry,
        private sanitizer: DomSanitizer,
        public dialog: MdDialog
    ) {
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
            });

        iconRegistry.addSvgIcon(
            'facebook',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/facebook.svg'));
        iconRegistry.addSvgIcon(
            'twitter',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/twitter.svg'));

        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.email])],
            'password': ['', Validators.compose([Validators.required])],
            'role': [''],
            'checkboxRemember': [false],
            'countryCode': ['']
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.checkboxRemember = this.form.controls['checkboxRemember'];
        this.role = this.form.controls['role'];
        this.countryCode = this.form.controls['countryCode'];
    }

    ngOnInit() {
        this.store.dispatch({
            type: auth.actionTypes.GET_COUNTRIES
        });
    }

    ngOnDestroy() {
        if (this.storeData) {
            this.storeData.unsubscribe();
        }
    }

    getFacebookData() {
        FB.api('/me?fields=id,name,first_name,last_name,email', (data) => {
            if (data && !data.error) {
                console.log(data);
            } else {
                console.log(data.error);
            }
        });
    }

    loginFacebook() {
        FB.getLoginStatus((response) => {
            FB.login((result) => {
                this.getFacebookData();
            }, { scope: 'email' });
            console.log(response);
        });
    }

    loginTwitter() {

    }

    countryCodeClick() {
        if (this.countries) {
            this.countries = this.countryCode.valueChanges
                .startWith(null)
                .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
        } else {
            this.countries = this.countryCode.valueChanges
                .startWith(null)
                .map(val => val ? this.filterOptions(val) : this.countryCodes.slice(0, 6));
            setTimeout(() => {
                this.countries = this.countryCode.valueChanges
                    .startWith(null)
                    .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
            }, 1);
        }
    }

    openForgotPasswordDialog() {
        let dialogRef = this.dialog.open(ForgotPasswordDialog);
        // dialogRef.disableClose = true;
        dialogRef.componentInstance.data = 'sa';
    }

    countries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
    }

    onSubmit() {
        let timezoneOffset = (new Date()).getTimezoneOffset();
        if (this.form.valid) {
            let data = {
                emailOrPhone: this.email.value,
                password: this.password.value,
                deviceType: 'WEB_BROWSER',
                //timezoneOffset: timezoneOffset
            };
            this.store.dispatch({
                type: auth.actionTypes.AUTH_LOGIN,
                payload: data
            });
        } else {
            if (this.email.hasError && this.email.errors) {
                if (this.email.errors.required) {
                    this.toastrService.clear();
                    this.toastrService.error('Email is required', 'Error');
                } else if (this.email.errors.invalid) {
                    this.toastrService.clear();
                    this.toastrService.error('Email is invalid', 'Error');
                }
            } else if (this.password.hasError && this.password.errors) {
                if (this.password.errors.required) {
                    this.toastrService.clear();
                    this.toastrService.error('Password is required', 'Error');
                } else if (this.password.errors.invalid) {
                    this.toastrService.clear();
                    this.toastrService.error('Password is invalid', 'Error');
                }
            }
        }
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    _keyPressCountryCode(event: any) {
        const pattern = /^([+])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}
