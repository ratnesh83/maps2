import { Component, ViewChild, ElementRef, Renderer, VERSION } from '@angular/core';
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
import { ChangeMobileDialog } from '../change-mobile-dialog/change-mobile-dialog.component';
import 'style-loader!./verification-mobile.scss';

declare const FB: any;

@Component({
    selector: 'verification-mobile',
    templateUrl: './verification-mobile.html',
})

export class VerificationMobile {

    @ViewChild('inputCodeOne') public _inputCodeOne: ElementRef;
    @ViewChild('inputCodeTwo') public _inputCodeTwo: ElementRef;
    @ViewChild('inputCodeThree') public _inputCodeThree: ElementRef;
    @ViewChild('inputCodeFour') public _inputCodeFour: ElementRef;

    allLanguage = [];

    version = VERSION;
    private lastInserted: number[] = [];

    public form: FormGroup;
    public email: AbstractControl;
    public role: AbstractControl;
    public checkboxRemember: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;
    public domains: any[];
    public settings: any;
    public countryCode: AbstractControl;
    public countryCodes = [];
    public selectedPhone;
    public selectedCountryCode;
    user = new User();

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
        this.selectedCountryCode = '+91';
        this.selectedPhone = '9988776655';
        this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
            });

        this.user.role = this.roles[0].value;

        this.form = fb.group({
            'email': [this.user.email, Validators.compose([Validators.required, EmailValidator.email])],
            'password': [this.user.password, Validators.compose([Validators.required])],
            'role': [this.user.role],
            'checkboxRemember': [this.user.checkboxRemember],
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
        this.countries = this.countryCode.valueChanges
            .startWith(null)
            .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
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
        let dialogRef = this.dialog.open(ChangeMobileDialog);
        // dialogRef.disableClose = true;
        dialogRef.componentInstance.data = 'sa';
    }

    countries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
    }

    isEmail(control: FormControl): {
        [s: string]: boolean
    } {
        if (control.value) {
            if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return {
                    noEmail: true
                };
            }
        }

    }

    onSubmit(values: Object, event) {
        let remember;

        //  console.log(this.user.checkboxRemember);
        if (this.user.checkboxRemember) {
            remember = this.user.checkboxRemember;
            this.user.checkboxRemember = remember;
        }
        else {
            remember = false;
            //  console.log("user.checkbox",remember)
            this.user.checkboxRemember = remember;
        }

        //console.log(this.user);
        event.preventDefault();
        this.submitted = true;

        if (this.form.valid) {
            let data = {
                email: this.user.email,
                password: this.user.password,
                rememberMe: this.user.checkboxRemember,
                role: this.user.role,
                deviceType: 'WEB'
            };
            this.baThemeSpinner.show();
            this.store.dispatch({
                type: auth.actionTypes.AUTH_LOGIN,
                payload: data
            });
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

    _keyPressCountryCode(event: any) {
        const pattern = /^([+])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}
