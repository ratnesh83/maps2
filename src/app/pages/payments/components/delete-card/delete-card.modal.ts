import { Component, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import 'style-loader!./delete-card.scss';

@Component({
  selector: 'add-card-modal',
  templateUrl: 'delete-card.html'
})

export class deleteCardModal {
    constructor(
        public activeModal: NgbActiveModal,
        private store: Store<any>,
    ) {}
    closeModal() {
        this.activeModal.close();
    }
}
