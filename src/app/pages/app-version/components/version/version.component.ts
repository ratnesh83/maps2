import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, CountryCodeValidator } from '../../../../../theme/validators';
import * as version from '../../state/app-version.actions';
// import 'style-loader!./version.scss';

@Component({
    selector: 'version',
    templateUrl: 'version.html',
    styleUrls:['version.scss']
})

export class Version {
   
    constructor(private activeModal: NgbActiveModal, private store: Store<any>) {

    }
    
}
