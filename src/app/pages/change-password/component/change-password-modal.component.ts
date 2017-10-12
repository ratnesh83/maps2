import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as pass from '../state';
import { EmailValidator, EqualPasswordsValidator } from '../../../theme/validators';
import { User } from '../../../auth/model/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaThemeSpinner } from '../../../theme/services';
import * as admin from '../state/change-password-modal.action';
import 'style-loader!./change-password-modal.scss';

@Component({
    selector: 'change-password-modal',
    templateUrl: 'change-password-modal.html'

})

export class ChangePasswordModal implements OnInit {
    public form: FormGroup;
    public oldPassword: AbstractControl;
    public newPassword: AbstractControl;
    public passwords: FormGroup;
    public submitted: boolean = false;
    modalHeader: string = 'CHANGE PASSWORD';

    constructor(fb: FormBuilder
        , private activeModal: NgbActiveModal
        , private modalService: NgbModal
        , private store: Store<any>
        , private baThemeSpinner: BaThemeSpinner) {
        this.form = fb.group({

            'oldPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]

            //  {validator: EqualPasswordsValidator.validate('oldPassword', 'newPassword')}

        });

        this.oldPassword = this.form.controls['oldPassword'];
        this.newPassword = this.form.controls['newPassword'];

        this.store
            .select('pass')
            .subscribe((res: any) => {
                if (res.ChangePasswordSuccess) {
                    this.activeModal.close();
                }


            });


    }

    closeModal() {
        this.activeModal.close();
    }
    onSubmit(formValue) {
        let fd = new FormData();
        fd.append('oldPassword', formValue.oldPassword);
        fd.append('newPassword', formValue.newPassword);
        this.store.dispatch({
            type: pass.actionTypes.CHANGE_PASSWORD,
            payload: fd
        });
    }

    ngOnInit() { }


}