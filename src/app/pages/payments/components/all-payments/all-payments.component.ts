import { Component, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as payment from '../../state/payment.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { Store } from '@ngrx/store';
import { FormGroup, AbstractControl, FormBuilder, Validators ,FormControl} from '@angular/forms';
import { ToastrService , ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
import { EmailValidator} from '../../../../theme/validators';

import * as createJob from '../../state/create-job.actions';
import * as app from '../../../../state/app.actions';


import 'style-loader!./all-payments.scss';
import { PaymentValidator } from '../../../../theme/validators/payment.validator';

@Component({
    selector: 'all-payments',
    templateUrl: 'all-payments.html'
})
export class AllPayments {

    public payments;
    public page = 1;
    public limit = 4;
    public count: number;
    public pageIndex;
    public selectedValue: string;
    public newValue;
    show: boolean = true;
    public cardNumber1: AbstractControl;
    public cardHolderName: AbstractControl;
    public expiration: AbstractControl;
    public cvv: AbstractControl;
    public submitted: boolean = false;
    public activeCreateJob;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    messageToken: string;
    private lastInserted: number[] = [];
    options: ToastrConfig;
    title = '';
    message = '';
  
  
    constructor(private fb: FormBuilder,
                private store: Store<any>,
                private _zone: NgZone,
                private toastrService: ToastrService) {

        // this.form = this.fb.group({
        //     'cardNumber1': ['', Validators.compose([Validators.required, PaymentValidator.cardNumber])],
        //     'cardHolderName': ['', Validators.compose([Validators.required, EmailValidator.onlyAlpha])],
        //     'expiration': ['', Validators.compose([Validators.required, PaymentValidator.expiryDate])],
        //     'cvv': ['', Validators.compose([Validators.required, PaymentValidator.cvvValid])],
        //   });
        //   this.cardNumber1 = this.form.controls['cardNumber1'];
        //   this.cardHolderName = this.form.controls['cardHolderName'];
        //   this.expiration = this.form.controls['expiration'];
        //   this.cvv = this.form.controls['cvv'];
      

        this.store
            .select('payment')
            .subscribe((res: any) => {

                this.payments = res.payments;
                this.count = res.count;
                this.pageIndex = (res.currentPage - 1) * res.limit;
            });
    }

    form = new FormGroup({
        'card_holder_name': new FormControl('',[Validators.required, EmailValidator.onlyAlpha]),
        'card_number': new FormControl('',[Validators.required, PaymentValidator.cardNumber]),
        'card_expire_date': new FormControl('',[Validators.required, PaymentValidator.expiryDate]),
        'card_cvv': new FormControl('',[Validators.required, PaymentValidator.cvvValid])
    });

    onSubmit(value){
        let expiryMonth = value.card_expire_date.split('-');
        let expiryYear = expiryMonth[1];
        expiryMonth = expiryMonth[0];
        (<any>window).Stripe.card.createToken({
            number: value.card_number,
            exp_month: expiryMonth,
            exp_year: expiryYear,
            cvc: value.card_cvv,
            name: value.card_holder_name
          }, (status: number, response: any) => {
      
            // Wrapping inside the Angular zone
            this._zone.run(() => {
                if (status === 200) {
                    console.log(response.card.id);
                    console.log(response.id);
                    console.log(response);
                    console.log(response.card.funding);
                    let formValue = {
                      'data':{
                        'stripeToken': response.id,
                        'setDefault': true
                      }                    
                    };
                    console.log("hello");
                    console.log(formValue)
                      this.store.dispatch({type: payment.actionTypes.ADD_CARD, payload: formValue});
                  }
                  else {
                    
                  }
                });
            });
          }
        }
      

