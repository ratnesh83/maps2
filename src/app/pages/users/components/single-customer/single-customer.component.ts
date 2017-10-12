import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as customer from '../../state/user.actions';
import { BaThemeSpinner } from '../../../../theme/services';


import 'style-loader!./single-customer.scss';

@Component({
    selector: 'single-customer',
    templateUrl: 'single-customer.html',
})
export class SingleCustomer {
    newUserData;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal
    ) {

        this.store
            .select('customer')
            .subscribe((res: any) => {
                if (res.showCustomerData) {
                    this.newUserData = res.showCustomerData.data;
                }
            });

    };











}
