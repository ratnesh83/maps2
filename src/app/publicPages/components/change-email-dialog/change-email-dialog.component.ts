import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DataService } from '../../../services/data-service/data.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../../theme/validators';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'style-loader!./change-email-dialog.scss';

@Component({
    selector: 'change-email-dialog',
    template: `
        <md-dialog-content>
            <div class="forgot-block">
                <div class="forgot-block-inner">
                    <div style="width: 100%; text-align: center; margin-bottom: 25px">
                        <img class="image" src="assets/img/lock2.png">
                    </div>
                    <div style="width: 100%; text-align: center">
                        <h2 class="title">
                            Change Email
                        </h2>
                    </div>
                </div>
                <div class="forgot-block-message">
                    <span style="color: #777777">
                        
                    </span>
                </div>
                <div class="forgot-block-inner">
                    <div style="text-align: center">
                        <form [formGroup]="form">
                            <input type="text" [formControl]="email" class="form-control" id="inputEmail" placeholder="Email">
                        </form>
                    </div>
                    <div class="form-action-btn form-action-btns">
                        <div class="form-group row">
                            <div class="col-12 col-sm-12">
                                <button md-raised-button type="button" (click)="submit()" color="primary" class="btn btn-warning btn-block btn-login">RESET PASSWORD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ChangeEmailDialog {

    public data;
    public userId;
    public form: FormGroup;
    public email: AbstractControl;

    constructor(private fb: FormBuilder,
        private dialog: MdDialog,
        private toastrService: ToastrService,
        private dataService: DataService) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.email])]
        });
        this.email = this.form.controls['email'];
    }

    ngOnInit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
    }

    submit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
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
        let data = {
            userId: this.userId,
            email: this.email.value
        };
        console.log(data);
    }
}



