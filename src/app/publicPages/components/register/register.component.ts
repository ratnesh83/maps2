import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

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
    public countryCodes = [];

    public submitted: boolean = false;

    constructor(fb: FormBuilder,
        private store: Store<any>,
        private iconRegistry: MdIconRegistry,
        private sanitizer: DomSanitizer,
        private cdRef: ChangeDetectorRef) {

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
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'companyName': [''],
            'email': ['', Validators.compose([Validators.required, EmailValidator.email])],
            'countryCode': [''],
            'phone': [''],
            'signUpType': ['1'],
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
    }

    ngOnDestroy() {
        if (this.storeData) {
            this.storeData.unsubscribe();
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
    }

    getFacebookData() {
        FB.api('/me?fields=id,name,first_name,last_name,email', (data) => {
            if (data && !data.error) {
                console.log(data);
                if (data.id) {
                    this.socialId.setValue(data.id);
                    this.cdRef.detectChanges();
                }
                if (data.name) {
                    this.name.setValue(data.name);
                }
                if (data.email) {
                    this.email.setValue(data.email);
                }
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

    onSubmit(values: Object): void {
        this.submitted = true;
        console.log(values);
        if (this.form.valid) {
            // your code goes here
            // console.log(values);
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
