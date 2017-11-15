import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as donation from '../../state/donation.actions';
import 'style-loader!./donations.scss';

@Component({
    selector: 'donation',
    templateUrl: 'donations.html',
})

export class Donation {
   
    constructor(private activeModal: NgbActiveModal, private store: Store<any>) {

    }
    
}
