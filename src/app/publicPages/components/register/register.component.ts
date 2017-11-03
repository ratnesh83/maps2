import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { DataService } from '../../../services/data-service/data.service';

import 'style-loader!./register.scss';

declare const FB: any;

@Component({
    selector: 'register',
    templateUrl: './register.html',
})
export class Register {

    public storeData;
    public form: FormGroup;
    public name: AbstractControl;
    public companyName: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;
    public countryCode: AbstractControl;
    public phone: AbstractControl;
    public description: AbstractControl;
    public expertiseDescription: AbstractControl;
    public signUpType: AbstractControl;
    public agreement: AbstractControl;
    public socialId: AbstractControl;
    public termsLink;
    public socialMode;
    public countryCodes = [];

    public submitted: boolean = false;

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private toastrService: ToastrService,
        private iconRegistry: MdIconRegistry,
        private sanitizer: DomSanitizer,
        private cdRef: ChangeDetectorRef,
        private facebook: FacebookService,
        private dataService: DataService) {

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
            'name': ['', Validators.compose([Validators.required])],
            'companyName': [''],
            'email': ['', Validators.compose([Validators.required, EmailValidator.email])],
            'countryCode': [''],
            'phone': [''],
            'signUpType': ['USER'],
            'agreement': [false],
            'socialId': [''],
            'description': [''],
            'expertiseDescription': [''],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
        });

        this.name = this.form.controls['name'];
        this.companyName = this.form.controls['companyName'];
        this.email = this.form.controls['email'];
        this.passwords = <FormGroup>this.form.controls['passwords'];
        this.countryCode = this.form.controls['countryCode'];
        this.phone = this.form.controls['phone'];
        this.description = this.form.controls['description'];
        this.expertiseDescription = this.form.controls['expertiseDescription'];
        this.signUpType = this.form.controls['signUpType'];
        this.agreement = this.form.controls['agreement'];
        this.socialId = this.form.controls['socialId'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];

    }

    ngOnInit() {
        this.store.dispatch({
            type: auth.actionTypes.GET_COUNTRIES
        });
        let link = window.location.href;
        let baseLink;
        let token = '/register';
        if (link.indexOf(token) != -1) {
            baseLink = link.substr(0, link.indexOf(token) + 1);
            this.termsLink = baseLink + 'terms';
        }
        this.socialMode = null;
    }

    ngOnDestroy() {
        if (this.storeData) {
            //this.storeData.unsubscribe();
        }
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

    countries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
    }

    changeSignUpType(type) {
        this.name.reset();
        this.email.reset();
        this.password.reset();
        this.repeatPassword.reset();
        this.countryCode.reset();
        this.phone.reset();
        this.agreement.reset();
        this.agreement.setValue(false);
        this.socialId.reset();
        this.description.reset();
        this.expertiseDescription.reset();
        this.socialMode = null;
    }

    getFacebookData() {
        this.facebook.api('/me?fields=id,name,first_name,gender,email')
            .then((response: any) => {
                if (response.id) {
                    this.socialId.setValue(response.id);
                }
                if (response.name) {
                    this.name.setValue(response.name);
                }
                if (response.email) {
                    this.email.setValue(response.email);
                }
                this.socialMode = 'FACEBOOK';
            }, (error: any) => {
                // console.error(error);
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
                        // console.error(error);
                    });
            })
            .catch((error: any) => {
                // console.error(error);
            });
    }

    loginTwitter() {

    }

    onSubmit() {

        let timezoneOffset = (new Date()).getTimezoneOffset();
        if (this.signUpType.value == 'EMPLOYER' && !this.companyName.value) {
            this.toastrService.clear();
            this.toastrService.error('Company name is required', 'Error');
            return;
        }
        if (!this.name.value) {
            this.toastrService.clear();
            this.toastrService.error('Name is required', 'Error');
            return;
        }
        if (!this.countryCode.value) {
            this.toastrService.clear();
            this.toastrService.error('Country code is required', 'Error');
            return;
        }
        if (!this.phone.value) {
            this.toastrService.clear();
            this.toastrService.error('Phone number is required', 'Error');
            return;
        }
        if (!this.email.value) {
            this.toastrService.clear();
            this.toastrService.error('Email is required', 'Error');
            return;
        }
        if (this.email.errors && this.email.errors.invalidEmail) {
            this.toastrService.clear();
            this.toastrService.error('Please enter a valid email', 'Error');
            return;
        }
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
        
        let data = {
            userType: this.signUpType.value,
            email: this.email.value,
            fullName: this.name.value,
            password: this.password.value,
            countryCode: this.countryCode.value,
            phoneNumber: this.phone.value,
            timezoneOffset: timezoneOffset,
            stepNumber: 1,
            description: this.description.value,
            companyName: this.companyName.value,
            socialId: this.socialId.value,
            socialMode: this.socialMode
        };

        if (this.signUpType.value == 'USER') {
            data.description = this.expertiseDescription.value;
            delete data.companyName;
            if (this.socialMode == null || this.socialMode == '' || this.socialMode == undefined) {
                delete data.socialId;
                delete data.socialMode;
            }
        } else if (this.signUpType.value == 'EMPLOYER') {
            if (this.socialMode == null || this.socialMode == '' || this.socialMode == undefined) {
                delete data.socialId;
                delete data.socialMode;
            }
        }

        this.store.dispatch({
            type: auth.actionTypes.AUTH_REGISTER,
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

    _keyPressCountryCode(event: any) {
        const pattern = /^([+])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}
