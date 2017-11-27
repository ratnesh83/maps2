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
import { DataService } from '../../../services/data-service/data.service';
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
    public userId;
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
        private dataService: DataService,
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
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
    }

    ngOnDestroy() {
        if (this.storeData) {
            this.storeData.unsubscribe();
        }
    }

    onSubmit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
        let data = {
            userId: this.userId,
            verificationType: this.signUpType.value,
            stepNumber: 4
        };
        this.store.dispatch({
            type: auth.actionTypes.AUTH_SEND_VERIFICATION_TYPE,
            payload: data
        });
    }

}
