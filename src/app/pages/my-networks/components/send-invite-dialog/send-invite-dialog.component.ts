import { Component, ViewChild, ElementRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, NameValidator, CountryCodeValidator } from '../../../../theme/validators';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import * as request from '../../state/my-network.actions';
import 'style-loader!./send-invite-dialog.scss';

@Component({
    selector: 'send-invite-dialog',
    template: `
        <md-dialog-content style="padding: 24px 24px; min-width: 30vw">
            <div class="feeds-section page-input-block" style="margin: auto; margin-top: 8px; margin-bottom: 8px; max-width: 320px">
                <div class="form-group invite-input-box text-center">
                    <form [formGroup]="form">
                        <input #inputInviteEmail class="form-control" type="email" [formControl]="email" [ngClass]="{'has-input-error': (!email.valid && (email.touched || submitted))}" placeholder="Email">
                    </form>
                </div>
                <div class="text-center">
                    <button md-raised-button color="primary" type="button" class="btn btn-block btn-submit" style="background-color: #026eff" (click)="sendInvite()">
                        SEND INVITE
                    </button>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class SendInviteDialog {

    @ViewChild('inputInviteEmail') public _email: ElementRef;
    public form: FormGroup;
    public email: AbstractControl;

    constructor(private fb: FormBuilder,
        public dialog: MdDialog,
        private toastrService: ToastrService,
        private store: Store<any>) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.email])]
        });
        this.email = this.form.controls['email'];
    }

    sendInvite() {
        if (!this.email.value) {
            this.toastrService.clear();
            this.toastrService.error('Email is required', 'Error');
            if (this._email) {
                this._email.nativeElement.focus();
            }
            return;
        }
        if (this.email.errors && this.email.errors.invalidEmail) {
            this.toastrService.clear();
            this.toastrService.error('Please enter a valid email', 'Error');
            if (this._email) {
                this._email.nativeElement.focus();
            }
            return;
        }

        let formData = new FormData();
        formData.append('email', this.email.value);

        this.store.dispatch({
            type: request.actionTypes.APP_SEND_INVITE, payload: { 
                form: formData,
            }
        });
    }

}



