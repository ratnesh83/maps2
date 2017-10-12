import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, CountryCodeValidator } from '../../../../../theme/validators';
import * as help from '../../state/help-center.actions';
import 'style-loader!./help.scss';

@Component({
    selector: 'help',
    templateUrl: 'help.html',
})

export class Help {

    constructor(private store: Store<any>) {

    }
    
}
