import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as payment from '../../state/payment.actions';
import { BaThemeSpinner } from '../../../../theme/services';

import 'style-loader!./all-payments.scss';

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

    constructor(private store: Store<any>,
        private baThemeSpinner: BaThemeSpinner,
        private modalService: NgbModal
    ) {

        this.store
            .select('payment')
            .subscribe((res: any) => {

                this.payments = res.payments;
                this.count = res.count;
                this.pageIndex = (res.currentPage - 1) * res.limit;
            });
    }

}
