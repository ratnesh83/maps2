import { Component, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'style-loader!./warning.scss';
import * as payment from '../../state/payment.actions';
import { BaThemeSpinner } from '../../../../theme/services';



@Component({
  selector: 'warning-modal',
  templateUrl: 'warning.html'
})

export class WarningModal {
    constructor(
        public activeModal: NgbActiveModal,
    ) {
    }
    closeModal() {
        this.activeModal.close();
    }
}
