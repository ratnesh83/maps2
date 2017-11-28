import { Component, NgZone, OnDestroy } from '@angular/core';
import * as payment from '../../state/payment.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { Store } from '@ngrx/store';
import { FormGroup, AbstractControl, FormBuilder, Validators ,FormControl} from '@angular/forms';
import { ToastrService , ToastrConfig } from 'ngx-toastr';
import { cloneDeep, random } from 'lodash';

const types = ['success', 'error', 'info', 'warning'];
import { EmailValidator} from '../../../../theme/validators';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


//import * as createJob from '../../state/create-job.actions';
import * as app from '../../../../state/app.actions';


import 'style-loader!./all-payments.scss';
import { PaymentValidator } from '../../../../theme/validators/payment.validator';
import { deleteCardModal } from '../delete-card/delete-card.modal';
import { WarningModal } from '../warning/warning.modal';

@Component({
    selector: 'all-payments',
    templateUrl: 'all-payments.html'
})
export class AllPayments implements OnDestroy {
    public warningModel;
    
    public deleteCardActionModel;

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


    public cards=[];
    public defaultCard;
    public planmode;
    public donatemode;
    public amount;
    constructor(private fb: FormBuilder,
                private store: Store<any>,
                private _zone: NgZone,
                private modalService: NgbModal,                
                private toastrService: ToastrService,
                private _spinner:BaThemeSpinner) {

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
               console.log(res);
               this.cards = res.cardDetails;
               if(this.cards){
               this.count = this.cards.length;}
               this.defaultCard = res.defaultCard;
            });
            this.store.dispatch({ type: payment.actionTypes.GET_CARDS});  
            if(localStorage.getItem("payamount")){
                this.donatemode = true;
                this.amount = localStorage.getItem("payamount");
            }
            else{
            if(localStorage.getItem("pay")){
                this.planmode = true;
                this.amount = localStorage.getItem("amount");
            }
        }
        }

    form = new FormGroup({
        'card_holder_name': new FormControl('',[Validators.required, EmailValidator.onlyAlpha]),
        'card_number': new FormControl('',[Validators.required, PaymentValidator.cardNumber]),
        'card_expire_date': new FormControl('',[Validators.required, PaymentValidator.expiryDate,Validators.minLength(5)]),
        'card_cvv': new FormControl('',[Validators.required, PaymentValidator.cvvValid])
    });

    onSubmit(value){
        this.submitted = true;
       if(this.form.valid && (this.count < 4)){
        this._spinner.show();
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
                      this._spinner.hide();    
                                      
                  }
                });
            });
          }
          else{
              if((this.count >= 4) && this.form.valid){
                let m = "Can not add more than 4 cards";
                let t = 'error';
                const opt = cloneDeep(this.options);
                const inserted = this.toastrService[types[0]](m, t, opt);
                  if (inserted) {
                    this.lastInserted.push(inserted.toastId);
                  }
                  return inserted;
              }
          }
        }
          openModalNew(value,isDefault){
              if(isDefault == true){
                this.warningModel = this.modalService.open(WarningModal, { size: 'sm' });             
              }
              else{
            this.store.dispatch({ type: payment.actionTypes.CONFIRM_DELETE,payload:{card:value.cardId}});              
            this.deleteCardActionModel = this.modalService.open(deleteCardModal, { size: 'sm' });
          }}
          pay(){
              let formValue;
               if(localStorage.getItem('payamount')){
                let amount = parseFloat(localStorage.getItem('payamount')); 
                formValue = {
                    'payFor':'donation',                    
                    'data':{
                      'amount':amount,
                      'cardId':this.defaultCard,
                    }
                };    
            }
            if(localStorage.getItem('pay')){
                let planId = localStorage.getItem('pay');
                formValue = {
                    'payFor':'plan',
                    'data':{
                      'planId':planId,
                      'cardId':this.defaultCard,
                    }
                };    
            }
              this._spinner.show();  
              this.store.dispatch({ type: payment.actionTypes.PAYMENT,payload:formValue}); 
            
          }
          ngOnDestroy(){   
              localStorage.removeItem('payamount');
              localStorage.removeItem('amount');
              localStorage.removeItem('pay');
          }
          
        }
      

