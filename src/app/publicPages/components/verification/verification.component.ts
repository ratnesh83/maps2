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
import { User } from '../../../auth/model/user.model';
import { Router } from '@angular/router';
import 'style-loader!./verification.scss';

declare const FB: any;

@Component({
    selector: 'verification',
    templateUrl: './verification.html',
})

export class Verification {

    public storeData;
    public form: FormGroup;
    public signUpType: AbstractControl;
    public role: AbstractControl;
    public submitted: boolean = false;

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
        private router: Router,
        public dialog: MdDialog
    ) {
        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {

            });

        this.form = fb.group({
            'signUpType': ['SMS']
        });

        this.signUpType = this.form.controls['signUpType'];
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.storeData) {
            //this.storeData.unsubscribe();
        }
    }

    onSubmit() {
        if (this.signUpType.value == 'SMS') {
            this.router.navigate(['verifyMobile']);
        } else if (this.signUpType.value == 'EMAIL') {
            this.router.navigate(['verifyEmail']);
        }
    }

}
