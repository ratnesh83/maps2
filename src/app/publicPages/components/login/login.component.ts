import { Component } from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
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
import { ChangePasswordDialog } from '../change-password-dialog/change-password-dialog.component';
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
    public phone: AbstractControl;
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
        public dialog: MdDialog,
        public facebook: FacebookService
    ) {
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
                if (res && res.forgotPassOtp && res.forgotPassOtp.statusCode && res.forgotPassOtp.statusCode == 200) {
                    this.dialog.closeAll();
                    this.openChangePasswordDialog();
                }
                if (res && res.resetOtp && res.resetOtp.statusCode && res.resetOtp.statusCode == 200) {
                    this.dialog.closeAll();
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
            'phone': ['', Validators.compose([Validators.required])],
            'countryCode': ['', Validators.compose([Validators.required])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.checkboxRemember = this.form.controls['checkboxRemember'];
        this.phone = this.form.controls['phone'];
        this.countryCode = this.form.controls['countryCode'];

    }

    ngOnInit() {
        this.store.dispatch({
            type: auth.actionTypes.GET_COUNTRIES
        });

    }

    ngAfterViewInit() {
        let passwordresetlink = window.location.href;
        let resetToken;
        let token = '?resetToken=';
        if (passwordresetlink.indexOf(token) != -1) {
            resetToken = passwordresetlink.substr(passwordresetlink.indexOf(token) + token.length, passwordresetlink.length);
            setTimeout(() => {
                this.openChangePasswordTokenDialog(resetToken);
            });
        }
    }

    ngOnDestroy() {
        if (this.storeData) {
            // this.storeData.unsubscribe();
        }
    }

    getFacebookData() {
        this.facebook.api('/me?fields=id,name,first_name,gender,email')
            .then((response: any) => {
                this.onFacebookSubmit(response);
            }, (error: any) => {
                console.error(error);
            });
    }

    loginFacebook() {
        this.facebook.getLoginStatus()
            .then(() => {
                this.facebook.login({ scope: 'email' })
                    .then((response: LoginResponse) => {
                        this.getFacebookData();
                    })
                    .catch((error: any) => {
                        console.error(error);
                    });
            })
            .catch((error: any) => {
                console.error(error);
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
    }

    openChangePasswordDialog() {
        let dialogRef = this.dialog.open(ChangePasswordDialog);
        // dialogRef.disableClose = true;
    }

    openChangePasswordTokenDialog(token) {
        let dialogRef = this.dialog.open(ChangePasswordDialog);
        // dialogRef.disableClose = true;
        dialogRef.componentInstance.data = token;
    }

    countries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
    }

    onFacebookSubmit(value) {
        let timezoneOffset = (new Date()).getTimezoneOffset();
        if (this.form.valid) {
            let data = {
                socialId: value.id,
                socialMode: 'FACEBOOK',
                deviceType: 'WEB_BROWSER',
                timezoneOffset: timezoneOffset
            };
            this.store.dispatch({
                type: auth.actionTypes.AUTH_SOCIAL_LOGIN,
                payload: data
            });
        }
    }

    onSubmit() {
        let timezoneOffset = (new Date()).getTimezoneOffset();
        if (!this.phone.value && !this.email.value) {
            if (this.phone.errors.required) {
                this.toastrService.clear();
                this.toastrService.error('Phone number or email is required', 'Error');
            }
        } else if ((this.countryCode.value || this.phone.value) && !this.email.value && this.phone.hasError && this.phone.errors) {
            if (this.phone.errors.required) {
                this.toastrService.clear();
                this.toastrService.error('Phone number is required', 'Error');
            }
        } else if (this.email.value && !this.phone.value && this.email.hasError && this.email.errors) {
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
        } else {
            let data = {
                emailOrPhone: this.email.value,
                countryCode: this.countryCode.value,
                password: this.password.value,
                deviceType: 'WEB_BROWSER',
                timezoneOffset: timezoneOffset
            };
            if (this.phone.value) {
                data.emailOrPhone = this.phone.value;
                data.countryCode = this.countryCode.value;
            } else if (this.email.value) {
                data.emailOrPhone = this.email.value;
                delete data.countryCode;
            }
            this.store.dispatch({
                type: auth.actionTypes.AUTH_LOGIN,
                payload: data
            });
        }
    }

    _keyPressEmail(event: any) {
        this.countryCode.reset();
        this.phone.reset();
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        } else {
            this.email.reset();
        }
    }

    _keyPressCountryCode(event: any) {
        const pattern = /^([+])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        } else {
            this.email.reset();
        }
    }

}
