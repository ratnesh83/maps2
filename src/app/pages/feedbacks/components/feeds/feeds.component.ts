import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, CountryCodeValidator } from '../../../../../theme/validators';
import * as feedback from '../../state/feedback.actions';
import 'style-loader!./feeds.scss';

@Component({
    selector: 'feeds',
    templateUrl: 'feeds.html',
})

export class Feeds {
 
    constructor(private activeModal: NgbActiveModal, private store: Store<any>) {

    }
}
