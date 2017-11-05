import { Component, ViewChild, ElementRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EmailValidator } from '../../../theme/validators';
import { DataService } from '../../../services/data-service/data.service';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
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
                        <img class="image" src="assets/img/mobile.png">
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
                            <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 phone-number-cc">
                                <img class="flag-placeholder" src="{{ 'assets/img/flags/iso/' + getCountryFlag(countryCode.value)?.toString()?.toLowerCase() + '.png' }}">
                                <input type="text" [formControl]="countryCode" class="form-control" (focus)="countryCodeClick()" id="inputCode" placeholder="+1"
                                    [mdAutocomplete]="auto" maxlength="5" (keypress)="_keyPressCountryCode($event)">
                                <md-autocomplete #auto="mdAutocomplete">
                                    <md-option *ngFor="let country of countries | async" [value]="'+' + country.phone_code">
                                        <img class="flag-options" src="{{ 'assets/img/flags/iso/' + country.country_code?.toString()?.toLowerCase() + '.png' }}"> {{ ' +' + country.phone_code }}
                                        <span style="color: rgba(0, 0, 0, 0.3)">
                                            {{ country.country_code }}
                                        </span>
                                    </md-option>
                                </md-autocomplete>
                                <span class="separator-cc-container">
                                    <span class="separator-cc"></span>
                                </span>
                            </div>
                            <div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 phone-number-phone">
                                <input #inputPhone type="text" class="form-control" [formControl]="phone" placeholder="Mobile Number" (keypress)="_keyPressNumber($event)">
                            </div>
                        </div>
                    </div>
                    <div class="form-action-btn form-action-btns">
                        <div class="form-group row">
                            <div class="col-12 col-sm-12">
                                <button md-raised-button (click)="submit()" type="button" color="primary" class="btn btn-warning btn-block btn-login">SEND OTP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ChangeMobileDialog {

    @ViewChild('inputPhone') public _phone: ElementRef;

    public data;
    public userId;
    public storeData;
    public form: FormGroup;
    public email: AbstractControl;
    public countryCode: AbstractControl;
    public phone: AbstractControl;
    public countryCodes = [];

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private toastrService: ToastrService,
        private dataService: DataService,
        private dialog: MdDialog) {
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
            });

        this.form = fb.group({
            'countryCode': ['', Validators.compose([Validators.required])],
            'phone': ['', Validators.compose([Validators.required])]
        });

        this.countryCode = this.form.controls['countryCode'];
        this.phone = this.form.controls['phone'];
    }

    ngOnInit() {
        this.store.dispatch({
            type: auth.actionTypes.GET_COUNTRIES
        });
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this._phone) {
                this._phone.nativeElement.focus();
            }
        });
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

    getCountryFlag(country) {
        for (let i = 0; i < this.countryCodes.length; i++) {
            if (country == this.countryCodes[i].phone_code) {
                return this.countryCodes[i].country_code;
            }
        }
        if(this.countryCode.value) {
            return 'default';
        }
        return 'us';
    }

    submit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
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
        let data = {
            userId: this.userId,
            countryCode: this.countryCode.value,
            phone: this.phone.value
        };
        console.log(data);
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



