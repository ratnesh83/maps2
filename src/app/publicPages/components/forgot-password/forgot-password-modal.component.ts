import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as auth from '../../../auth/state/auth.actions';
import { EmailValidator } from '../../../theme/validators';
import { User } from '../../../auth/model/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'style-loader!./forgot-password-modal.component.scss';

import { BaThemeSpinner } from '../../../theme/services';
//import { SignUpModal } from '../signUp-modal/signUp-modal.component';

@Component({
    selector: 'add-service-modal',
    templateUrl: './forgot-password-modal.component.html'
})

export class ForgotPassword implements OnInit {
    public form: FormGroup;
    public email: AbstractControl;
    public submitted: boolean = false;
    isloggedin;
    message: string;
    public domains: any[];
    public settings: any;
    user = new User();
    modalHeader: string = 'FORGOT PASSWORD';

    constructor(fb: FormBuilder, 
        private activeModal: NgbActiveModal, 
        private modalService: NgbModal, 
        private store: Store<any>, 
        private baThemeSpinner: BaThemeSpinner) {

        this.store
            .select('auth')
            .subscribe((res: any) => {
                // console.log("resssssss",res)
                if (res.forgotPass) {
                    this.activeModal.close();
                }
            });

        this.form = fb.group({
            'email': [this.user.email, Validators.compose([Validators.required, EmailValidator.email, Validators.minLength(4)])],
        });

        this.email = this.form.controls['email'];

    }
    ngOnInit() { }

    closeModal() {
        this.activeModal.close();
    }
    //openSignUp() {
    //  this.activeModal.close();
    //  const activeModal = this.modalService.open(SignUpModal);
    //}

    onSubmit(value, $event) {
        $event.preventDefault();
        this.submitted = true;
        if (this.form.valid) {
            let data = {
                email: this.user.email,
            };
            //console.log(data);
            //this.baThemeSpinner.show();
            this.store.dispatch({
                type: auth.actionTypes.AUTH_FORGOT_PASSWORD,
                payload: data
            });
        }
    }
}