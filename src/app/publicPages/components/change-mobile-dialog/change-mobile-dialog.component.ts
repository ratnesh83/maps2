import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EmailValidator } from '../../../theme/validators';
import * as auth from '../../../auth/state/auth.actions';
import {
    FormGroup,
    AbstractControl,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import 'style-loader!./change-mobile-dialog.scss';

@Component({
    selector: 'change-mobile-dialog',
    template: `
        <md-dialog-content>
            <div class="forgot-block">
                <div class="forgot-block-inner">
                    <div style="width: 100%; text-align: center; margin-bottom: 25px">
                        <img class="image" src="assets/img/lock2.png">
                    </div>
                    <div style="width: 100%; text-align: center">
                        <h2 class="title">
                            Change Mobile Number
                        </h2>
                    </div>
                </div>
                <div class="forgot-block-message">
                    <span style="color: #777777">
                        
                    </span>
                </div>
                <div class="forgot-block-inner">
                    <div style="text-align: center">
                        <div class="form-group row">
                            <div class="col-3 col-sm-3 phone-number-cc">
                                <input type="text" [formControl]="countryCode" class="form-control" (focus)="countryCodeClick()" id="inputCode" placeholder="+1"
                                    [mdAutocomplete]="auto" maxlength="5" (keypress)="_keyPressCountryCode($event)">
                                <md-autocomplete #auto="mdAutocomplete">
                                    <md-option *ngFor="let country of countries | async" [value]="'+' + country.phone_code">
                                        {{ '+' + country.phone_code }}
                                        <span style="color: rgba(0, 0, 0, 0.3)">
                                            {{ country.country_code }}
                                        </span>
                                    </md-option>
                                </md-autocomplete>
                                <span class="separator-cc-container">
                                    <span class="separator-cc"></span>
                                </span>
                            </div>
                            <div class="col-9 col-sm-9 phone-number-phone">
                                <input type="text" class="form-control" [formControl]="phone" id="inputPhone" placeholder="Mobile Number" (keypress)="_keyPressNumber($event)">
                            </div>
                        </div>
                    </div>
                    <div class="form-action-btn form-action-btns">
                        <div class="form-group row">
                            <div class="col-12 col-sm-12">
                                <button md-raised-button type="button" color="primary" class="btn btn-warning btn-block btn-login">SEND OTP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ChangeMobileDialog {
    data;
    public form: FormGroup;
    public email: AbstractControl;
    public countryCode: AbstractControl;
    public phone: AbstractControl;
    public countryCodes = [];
    constructor(fb: FormBuilder,
        private store: Store<any>,
        public dialog: MdDialog) {
        this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
            });

            this.form = fb.group({
                'email': ['', Validators.compose([Validators.required, EmailValidator.email])],
                'countryCode': [''],
                'phone': ['']
            });

            this.countryCode = this.form.controls['countryCode'];
            this.phone = this.form.controls['phone'];
    }

    ngOnInit() {
        this.store.dispatch({
            type: auth.actionTypes.GET_COUNTRIES
        });
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



