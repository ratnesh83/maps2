import { Component } from '@angular/core';
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

    public form: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;
    public countryCode: AbstractControl;
    public countryCodes = [];

    public submitted: boolean = false;

    constructor(fb: FormBuilder,
        private store: Store<any>,
        private iconRegistry: MdIconRegistry,
        private sanitizer: DomSanitizer) {

        this.store
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
            'email': ['', Validators.compose([Validators.required, EmailValidator.email])],
            'countryCode': [''],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, { validator: EqualPasswordsValidator.validate('password', 'repeatPassword') })
        });

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = <FormGroup>this.form.controls['passwords'];
        this.countryCode = this.form.controls['countryCode'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
    }

    ngOnInit() {
        this.store.dispatch({
            type: auth.actionTypes.GET_COUNTRIES
        });
        this.countries = this.countryCode.valueChanges
            .startWith(null)
            .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
    }

    countries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
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
    
    initializeCountryCodes() {
        this.countries = this.countryCode.valueChanges
            .startWith(null)
            .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
    }

    onSubmit(values: Object): void {
        this.submitted = true;
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
