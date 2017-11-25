import { Component, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'style-loader!./delete-card.scss';
import * as payment from '../../state/payment.actions';
import { BaThemeSpinner } from '../../../../theme/services';



@Component({
  selector: 'add-card-modal',
  templateUrl: 'delete-card.html'
})

export class deleteCardModal {
    public card;
    constructor(
        public activeModal: NgbActiveModal,
        private store: Store<any>,
        private _spinner:BaThemeSpinner
    ) {

        this.store
        .select('payment')
        .subscribe((res: any) => {
            console.log(res);
            this.card = res.card;
        });
    }
    closeModal() {
        this.activeModal.close();
    }
    setAsDefault(){
        this.activeModal.close();        
        this._spinner.show();
        this.store.dispatch({ type: payment.actionTypes.SET_AS_DEFAULT,payload:{card:this.card}});  
    }
    deleteCard(){
        this.activeModal.close();  
        this._spinner.show();        
        this.store.dispatch({ type: payment.actionTypes.DELETE_CARD,payload:{card:this.card}});                  
    }
}
