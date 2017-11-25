import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as donation from '../../state/donation.actions';
import { Router } from '@angular/router';
import { BaThemeSpinner } from '../../../../theme/services';

import 'style-loader!./donations.scss';

@Component({
    selector: 'donation',
    templateUrl: 'donations.html',
})

export class Donation implements OnInit {
    public donateAmount = '';
    public selected='';
    public donationHistory;
    public donationsStore;
    ngOnInit(){
        this._spinner.hide();
    }
   
    constructor(private activeModal: NgbActiveModal, private store: Store<any>, private router:Router,private _spinner:BaThemeSpinner) {
        this.donationsStore = this.store
        .select('donation')
        .subscribe((res: any) => {
            console.log(res);
            this.donationHistory = res.donations;
        });
        this.store.dispatch({ type: donation.actionTypes.GET_DONATIONS});                        

    }
    
    donate(value){
      localStorage.setItem('payamount',value);
      this.router.navigate(['/pages/payments']);
    }

    changeAmount(value,id){
        this.donateAmount = value;
        this.selected = id;
    }
}
