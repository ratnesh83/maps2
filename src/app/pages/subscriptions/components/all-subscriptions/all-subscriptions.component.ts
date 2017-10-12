import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as subscription from '../../state/subscription.actions';
import * as app from '../../../../state/app.actions';
import {
    MdSort,
    MdDialog,
    MdPaginator
} from '@angular/material';
import { BaThemeSpinner } from '../../../../theme/services';
import { BlockSubscriptionDialog } from '../block-subscription-dialog/block-subscription-dialog.component';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./all-subscriptions.scss';

@Component({
    selector: 'all-subscriptions',
    templateUrl: 'all-subscriptions.html',
})
export class AllSubscriptions {
    @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
    @ViewChild('employerSubscriptionsPaginator') private _paginatorEmployer: MdPaginator;
    @ViewChild('workerSubscriptionsPaginator') private _paginatorWorker: MdPaginator;
    public subscriptions = [];
    public page = 1;
    public limit = 4;
    public pageIndex;
    public count: number;
    public activeSubscription;
    public role: string;
    public value: 'all';
    public searchFilter: boolean;
    public updateLoading: boolean = false;
    public openForm: boolean = false;
    public editMode: boolean = false;
    public subscriptionForEmployer: boolean = false;
    public isTabChangeSuccess: boolean = false;
    public searchKey = '';
    public applicableFor = 'employer';
    public filter;
    public form: FormGroup;
    public subscriptionId: AbstractControl;
    public subscriptionName: AbstractControl;
    public subscriptionTime: AbstractControl;
    public subscriptionCost: AbstractControl;
    public currency: AbstractControl;
    public priority: AbstractControl;
    public description: AbstractControl;
    public startDate: AbstractControl;
    public endDate: AbstractControl;
    public discountType: AbstractControl;
    public discount: AbstractControl;
    public applicableForUsersNumber: AbstractControl;

    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    myOptionsSelected;

    priorities = [
        { value: 1, name: 'High' },
        { value: 2, name: 'Mediium' },
        { value: 3, name: 'Low' }
    ];

    discountTypes = [
        { value: 'percentage', name: 'Percentage' },
        { value: 'flatPrice', name: 'Flat' },
    ];

    length;
    pageSize = 5;
    pageSizeOptions = [5, 10, 25, 100, 500];

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        public dialog: MdDialog
    ) {
        this.form = fb.group({
            'subscriptionId': ['', Validators.compose([])],
            'applicableFor': ['', Validators.compose([])],
            'subscriptionName': ['', Validators.compose([])],
            'subscriptionTimeCategory': ['Days', Validators.compose([])],
            'subscriptionTime': ['', Validators.compose([])],
            'subscriptionCost': ['', Validators.compose([])],
            'currency': ['USD', Validators.compose([])],
            'priority': ['', Validators.compose([])],
            'description': [''],
            'subscriptionStartDate': ['', Validators.compose([])],
            'subscriptionEndDate': ['', Validators.compose([])],
            'subscriptionDiscountType': ['', Validators.compose([])],
            'subscriptionDiscount': ['', Validators.compose([])],
            'applicableForUsersNumber': ['-1', Validators.compose([])]
        });

        this.subscriptionId = this.form.controls['subscriptionId'];
        this.subscriptionName = this.form.controls['subscriptionName'];
        this.subscriptionTime = this.form.controls['subscriptionTime'];
        this.subscriptionCost = this.form.controls['subscriptionCost'];
        this.currency = this.form.controls['currency'];
        this.priority = this.form.controls['priority'];
        this.description = this.form.controls['description'];
        this.startDate = this.form.controls['subscriptionStartDate'];
        this.endDate = this.form.controls['subscriptionEndDate'];
        this.discountType = this.form.controls['subscriptionDiscountType'];
        this.discount = this.form.controls['subscriptionDiscount'];
        this.applicableForUsersNumber = this.form.controls['applicableForUsersNumber'];

        this.myOptions = [
            { id: 'isDeleted', name: 'Blocked' }
        ];
        this.myOptionsSelected = [
            { id: 'isDeleted', value: 'all' }
        ];

        this.store
            .select('subscription')
            .subscribe((res: any) => {
                this.subscriptions = res.subscriptions;
                this.count = res.count;
                this.length = this.count;
                this.limit = this.pageSize;
                this.activeSubscription = (res.activeSubscription) ? res.activeSubscription : null;
                this.pageIndex = res.currentPage - 1;

                if (res.getSubscription) {
                    this.isTabChangeSuccess = false;
                }

                if (res.addSubscription) {
                    this.updateLoading = false;
                    this.scrollToTop();
                    setTimeout(() => {
                        this.openForm = false;
                    }, 500);
                }

                if (res.editSubscription) {
                    this.updateLoading = false;
                    this.scrollToTop();
                    setTimeout(() => {
                        this.openForm = false;
                    }, 500);
                }

                if (res.error) {
                    this.updateLoading = false;
                }

            });
        this.onLoad();
    };

    onLoad() {
        this.value = 'all';
        this.filter = this.myOptionsSelected;
        this.getAllSubscription();
    };

    getAllSubscription() {
        this.store.dispatch({
            type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS, payload: {
                currentPage: this.page,
                limit: this.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value,
                applicableFor: this.applicableFor
            }
        });
    };

    pageChange(page) {
        this.store.dispatch({
            type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS, payload: {
                subscription: (this.searchKey != '') ? this.searchKey : undefined,
                currentPage: page.pageIndex + 1,
                limit: page.pageSize,
                role: this.role,
                filter: this.filter,
                applicableFor: this.applicableFor
            }
        });
        this.pageSize = page.pageSize;
    }

    goToLastPage(index) {
        if (this._paginatorEmployer) {
            this._paginatorEmployer.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
        }
        if (this._paginatorWorker) {
            this._paginatorWorker.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
        }
        let page = {
            pageIndex: Math.ceil(this.length / this.pageSize) - 1,
            pageSize: this.pageSize,
            length: this.length
        };
        this.pageChange(page);
        if (this._paginatorEmployer) {
            this._paginatorEmployer._changePageSize(this.pageSize);
        }
        if (this._paginatorWorker) {
            this._paginatorWorker._changePageSize(this.pageSize);
        }
    }

    goToFirstPage(index) {
        if (this._paginatorEmployer) {
            this._paginatorEmployer.pageIndex = 0;
        }
        if (this._paginatorWorker) {
            this._paginatorWorker.pageIndex = 0;
        }
        let page = {
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.length
        };
        this.pageChange(page);
        if (this._paginatorEmployer) {
            this._paginatorEmployer._changePageSize(this.pageSize);
        }
        if (this._paginatorWorker) {
            this._paginatorWorker._changePageSize(this.pageSize);
        }
    }

    pageChanged(page) {
        this.page = page;
        this.searchKey = (this.searchKey.length > 0) ? this.searchKey : '';
        if (!this.searchFilter) {
            this.store.dispatch({
                type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS, payload: {
                    subscription: (this.searchKey != '') ? this.searchKey : undefined,
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                    role: this.role,
                    filter: this.filter,
                    applicableFor: this.applicableFor
                }
            });
        } else {
            this.searchFilter = false;
        }
    }

    addSubscription(formValue) {
        if (formValue.subscriptionName == '' || formValue.subscriptionName == null) {
            this.toastrService.clear();
            this.toastrService.error('Subscription name is required', 'Error');
            return;
        }
        if (formValue.priority == null) {
            this.toastrService.clear();
            this.toastrService.error('Priority is required', 'Error');
            return;
        }
        if (formValue.subscriptionCost == '' || formValue.subscriptionCost == null) {
            this.toastrService.clear();
            this.toastrService.error('Amount is required', 'Error');
            return;
        }
        if (formValue.subscriptionDiscountType == '' || formValue.subscriptionDiscountType == null) {
            this.toastrService.clear();
            this.toastrService.error('Discount type is required', 'Error');
            return;
        }
        if (formValue.subscriptionDiscount == null) {
            this.toastrService.clear();
            this.toastrService.error('Discount is required', 'Error');
            return;
        }
        if (formValue.subscriptionDiscountType == 'flatPrice' && formValue.subscriptionDiscount != null && Number(formValue.subscriptionDiscount) > Number(formValue.subscriptionCost)) {
            this.toastrService.clear();
            this.toastrService.error('Discount cannot be greater than amount', 'Error');
            return;
        }
        if (formValue.subscriptionDiscountType == 'percentage' && formValue.subscriptionDiscount != null && Number(formValue.subscriptionDiscount) > 100) {
            this.toastrService.clear();
            this.toastrService.error('Discount cannot be greater than 100%', 'Error');
            return;
        }
        if (formValue.subscriptionStartDate == '' || formValue.subscriptionStartDate == null) {
            this.toastrService.clear();
            this.toastrService.error('Start date is required', 'Error');
            return;
        }
        if (formValue.subscriptionEndDate == '' || formValue.subscriptionEndDate == null) {
            this.toastrService.clear();
            this.toastrService.error('End date is required', 'Error');
            return;
        }
        if (formValue.applicableForUsersNumber == null) {
            this.toastrService.clear();
            this.toastrService.error('Applicable for users is required', 'Error');
            return;
        }

        if (this.subscriptionForEmployer) {
            this.applicableFor = 'employer';
            formValue.applicableFor = 'employer';
        } else {
            this.applicableFor = 'worker';
            formValue.applicableFor = 'worker';
        }
        delete formValue['subscriptionId'];
        formValue.subscriptionTime = formValue.subscriptionEndDate && formValue.subscriptionStartDate ? (formValue.subscriptionEndDate - formValue.subscriptionStartDate) / (24 * 60 * 60 * 1000) : 0;
        this.updateLoading = true;

        this.store.dispatch({
            type: subscription.actionTypes.ADD_SUBSCRIPTION,
            payload: { formData: formValue, applicableFor: this.applicableFor }
        });
    }

    editSubscriptionDetail(data, value) {
        if (value) {
            this.subscriptionForEmployer = true;
        } else {
            this.subscriptionForEmployer = false;
        }
        this.openForm = true;
        this.editMode = true;

        this.subscriptionId.setValue(data._id);
        this.subscriptionName.setValue(data.subscriptionName);
        this.subscriptionTime.setValue(data.subscriptionTime);
        this.subscriptionCost.setValue(data.subscriptionCost);
        this.priority.setValue(data.priority);
        this.description.setValue(data.description);
        if (data.subscriptionStartDate) {
            this.startDate.setValue(new Date(data.subscriptionStartDate));
        }
        if (data.subscriptionEndDate) {
            this.endDate.setValue(new Date(data.subscriptionEndDate));
        }
        this.discountType.setValue(data.subscriptionDiscountType);
        this.discount.setValue(data.subscriptionDiscount);
        this.applicableForUsersNumber.setValue(data.applicableForUsersNumber);
        this.scrollToBottom();
    }

    addSubscriptionDetail(value) {
        if (value) {
            this.subscriptionForEmployer = true;
        } else {
            this.subscriptionForEmployer = false;
        }
        this.subscriptionName.reset();
        this.subscriptionCost.reset();
        this.priority.reset();
        this.description.reset();
        this.startDate.reset();
        this.endDate.reset();
        this.discountType.reset();
        this.discount.reset();
        this.applicableForUsersNumber.reset();
        this.openForm = true;
        this.editMode = false;
        this.scrollToBottom();
    }

    editSubscription(formValue) {
        if (formValue.subscriptionName == '' || formValue.subscriptionName == null) {
            this.toastrService.clear();
            this.toastrService.error('Subscription name is required', 'Error');
            return;
        }
        if (formValue.priority == null) {
            this.toastrService.clear();
            this.toastrService.error('Priority is required', 'Error');
            return;
        }
        if (formValue.subscriptionCost == '' || formValue.subscriptionCost == null) {
            this.toastrService.clear();
            this.toastrService.error('Amount is required', 'Error');
            return;
        }
        if (formValue.subscriptionDiscountType == '' || formValue.subscriptionDiscountType == null) {
            this.toastrService.clear();
            this.toastrService.error('Discount type is required', 'Error');
            return;
        }
        if (formValue.subscriptionDiscount == null) {
            this.toastrService.clear();
            this.toastrService.error('Discount is required', 'Error');
            return;
        }
        if (formValue.subscriptionDiscountType == 'flatPrice' && formValue.subscriptionDiscount != null && Number(formValue.subscriptionDiscount) >= Number(formValue.subscriptionCost)) {
            this.toastrService.clear();
            this.toastrService.error('Discount cannot be greater than amount', 'Error');
            return;
        }
        if (formValue.subscriptionDiscountType == 'percentage' && formValue.subscriptionDiscount != null && Number(formValue.subscriptionDiscount) > 100) {
            this.toastrService.clear();
            this.toastrService.error('Discount cannot be greater than 100%', 'Error');
            return;
        }
        if (formValue.subscriptionStartDate == '' || formValue.subscriptionStartDate == null) {
            this.toastrService.clear();
            this.toastrService.error('Start date is required', 'Error');
            return;
        }
        if (formValue.subscriptionEndDate == '' || formValue.subscriptionEndDate == null) {
            this.toastrService.clear();
            this.toastrService.error('End date is required', 'Error');
            return;
        }
        if (formValue.applicableForUsersNumber == null) {
            this.toastrService.clear();
            this.toastrService.error('Applicable for users is required', 'Error');
            return;
        }

        if (this.subscriptionForEmployer) {
            this.applicableFor = 'employer';
            formValue.applicableFor = 'employer';
        } else {
            this.applicableFor = 'worker';
            formValue.applicableFor = 'worker';
        }
        formValue.subscriptionTime = formValue.subscriptionEndDate && formValue.subscriptionStartDate ? (formValue.subscriptionEndDate - formValue.subscriptionStartDate) / (24 * 60 * 60 * 1000) : 0;
        this.updateLoading = true;

        this.store.dispatch({
            type: subscription.actionTypes.EDIT_SUBSCRIPTION,
            payload: { formData: formValue, applicableFor: this.applicableFor }
        });
    }

    blockSubscriptionConfirm(data) {
        this.store.dispatch({
            type: subscription.actionTypes.BLOCK_SUBSCRIPTION_CONFIRM,
            payload: data
        });
        this.dialog.open(BlockSubscriptionDialog);
    }

    cancel() {
        this.scrollToTop();
        setTimeout(() => {
            this.openForm = false;
        }, 500);
    }

    selectTab(event) {
        if (event.index == 0) {
            this.applicableFor = 'employer';

        } else if (event.index == 1) {
            this.applicableFor = 'worker';
        }
        this.store.dispatch({
            type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS,
            payload: {
                currentPage: this.page,
                role: this.role,
                limit: this.pageSize,
                filter: this.filter,
                applicableFor: this.applicableFor
            }
        });
        this.isTabChangeSuccess = true;
        this.cancel();
    }

    scrollToTop() {
        jQuery('html, body').animate({ scrollTop: 0 }, { duration: 500 });
    }

    scrollToBottom() {
        jQuery('html, body').animate({ scrollTop: this._scrollContainer.nativeElement.scrollHeight + 50 }, { duration: 500 });
    }

    ngAfterViewInit() {
        this.scrollToTop();
    }

    SearchSubscription(name) {
        this.searchKey = name;
        if (name.length > 0) {
            this.searchFilter = true;
            this.page = 1;
            this.store.dispatch({
                type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS,
                payload: {
                    subscription: name,
                    currentPage: 1,
                    limit: this.pageSize,
                    role: this.role,
                    skip: 0,
                    filter: this.filter,
                    applicableFor: this.applicableFor
                }
            });
        } else if (name.length == 0) {
            this.page = 1;
            this.getAllSubscription();
        }
    }

    onChange() {
        for (let j = 0; j < this.myOptionsSelected.length; j++) {
            let i;
            for (i = 0; i < this.optionsModel.length; i++) {
                if (this.optionsModel[i] == this.myOptionsSelected[j].id) {
                    this.myOptionsSelected[j].value = true;
                    break;
                }
            }
            if (i == this.optionsModel.length) {
                this.myOptionsSelected[j].value = 'all';
            }
        }
        this.role = 'subscription';
        this.filter = this.myOptionsSelected;
        this.store.dispatch({
            type: subscription.actionTypes.APP_GET_ALL_SUBSCRIPTIONS,
            payload: {
                currentPage: this.page,
                role: this.role,
                limit: this.pageSize,
                filter: this.filter,
                applicableFor: this.applicableFor
            }
        });
        if (this._paginatorEmployer) {
            this._paginatorEmployer.pageIndex = 0;
            this._paginatorEmployer._changePageSize(this.pageSize);
        }
        if (this._paginatorWorker) {
            this._paginatorWorker.pageIndex = 0;
            this._paginatorWorker._changePageSize(this.pageSize);
        }
    }

    sortData(sort: MdSort) {
        const data = this.subscriptions.slice();
        if (!sort.active || sort.direction == '') {
            this.subscriptions = data;
            return;
        }
        this.subscriptions = data.sort((a, b) => {
            let isAsc = sort.direction == 'asc';
            switch (sort.active) {
                case 'name': return compare(a.subscriptionName, b.subscriptionName, isAsc);
                case 'amount': return compare(a.subscriptionCost, b.subscriptionCost, isAsc);
                case 'duration': return compare(a.subscriptionTime, b.subscriptionTime, isAsc);
                case 'users': return compare(a.applicableForUsersNumber, b.applicableForUsersNumber, isAsc);
                default: return 0;
            }
        });
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    _keyPressFloat(event: any) {
        const pattern = /^([0-9]*[.])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}