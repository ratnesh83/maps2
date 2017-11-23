import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as donation from '../../state/donation.actions';
import { Router } from '@angular/router';
import 'style-loader!./donations.scss';

@Component({
    selector: 'donation',
    templateUrl: 'donations.html',
})

export class Donation {
   
    constructor(private activeModal: NgbActiveModal, private store: Store<any>, private router:Router) {

    }
    
    donate(value){
      localStorage.setItem('payamount',value);
      this.router.navigate(['/pages/payments']);
    }
}
