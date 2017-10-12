import { Component, VERSION } from '@angular/core';
import {
    FormGroup,
    AbstractControl,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BaThemeSpinner } from '../../../theme/services';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { EmailValidator } from '../../../theme/validators';
import { User } from '../../../auth/model/user.model';
import 'style-loader!./login.scss';

import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';
const types = ['success', 'error', 'info', 'warning'];

@Component({
    selector: 'login',
    templateUrl: './login.html',
})
export class Login {
    options: ToastrConfig;
    title = '';
    type = types[0];
    message = '';
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
        private toastrService: ToastrService
    ) {
        
        this.options = this.toastrService.toastrConfig;
        
        this.user.role = this.roles[0].value;

        this.form = fb.group({
            'email': [this.user.email, Validators.compose([Validators.required, EmailValidator.email])],
            'password': [this.user.password, Validators.compose([Validators.required])],
            'role': [this.user.role],
            'checkboxRemember': [this.user.checkboxRemember]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.checkboxRemember = this.form.controls['checkboxRemember'];
        this.role = this.form.controls['role'];
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

    openToast() {
        let m = 'amar';
        let t = 'amar';
        const opt = cloneDeep(this.options);
        this.toastrService.clear();
        const inserted = this.toastrService[this.type](m, t, opt);
        if (inserted) {
            this.lastInserted.push(inserted.toastId);
        }
        return inserted;
    }

}
