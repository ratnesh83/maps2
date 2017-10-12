import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
    MdSort,
    MdDialog,
    MdPaginator
} from '@angular/material';
import * as worker from '../../state/user.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { BlockWorkerModal } from '../block-worker-modal/block-worker-modal.component';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./all-workers.scss';

@Component({
    selector: 'all-workers',
    templateUrl: 'all-workers.html',
})

export class AllWorkers implements OnInit {
    @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
    @ViewChild('workersPaginator') private _paginator: MdPaginator;
    public workers;
    public page = 1;
    public limit;
    public searchKey = '';
    public pageIndex;
    public count: number;
    public activeWorker;
    public name: string;
    public role: string;
    public searchString: string;
    public searchFilter: boolean;
    public value: 'all';
    public filter;
    public form: FormGroup;
    public workerName: AbstractControl;
    public userName: AbstractControl;
    public email: AbstractControl;
    public countryCode: AbstractControl;
    public phoneNumber: AbstractControl;
    public openFormWorker: boolean = false;
    public updateLoading: boolean = false;
    public countryCodes = [];

    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    myOptionsSelected;

    length;
    pageSize = 5;
    pageSizeOptions = [5, 10, 25, 100, 500];

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private fb: FormBuilder,
        private toastrService: ToastrService,
        public dialog: MdDialog
    ) {

        this.myOptions = [
            { id: 'isAdminVerified', name: 'Approved' },
            { id: 'isBlocked', name: 'Blocked' },
            { id: 'hasCompletedRegistration', name: 'Registration Completed' }
        ];
        this.myOptionsSelected = [
            { id: 'isAdminVerified', value: 'all' },
            { id: 'isDeleted', value: false },
            { id: 'isBlocked', value: 'all' },
            { id: 'hasCompletedRegistration', value: 'all' }
        ];

        this.form = fb.group({
            'name': [''],
            'email': [''],
            'countryCode': [''],
            'mobile': ['']
        });

        this.workerName = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.countryCode = this.form.controls['countryCode'];
        this.phoneNumber = this.form.controls['mobile'];

        this.limit = this.pageSize;

        this.store
            .select('worker')
            .subscribe((res: any) => {
                //console.log(res);
                this.workers = res.workers;
                this.count = res.count;
                this.length = this.count;
                this.limit = this.pageSize;
                this.activeWorker = (res.activeWorker) ? res.activeWorker : null;
                this.pageIndex = res.currentPage - 1;
                if (res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
                if (res.createWorker) {
                    this.updateLoading = false;
                    this.scrollToTop();
                    this.workerName.reset();
                    this.email.reset();
                    this.countryCode.reset();
                    this.phoneNumber.reset();
                    setTimeout(() => {
                        this.openFormWorker = false;
                    }, 500);
                }
                if (res.error) {
                    this.updateLoading = false;
                }
            });
    };

    ngOnInit() {
        this.onLoad();
        this.store.dispatch({
            type: worker.actionTypes.GET_COUNTRY_CODE
        });
        this.countries = this.countryCode.valueChanges
            .startWith(null)
            .map(val => val ? this.filterOptions(val) : this.countryCodes.slice());
    }

    ngOnDestroy() {
        
    }

    countries: Observable<any[]>;

    filterOptions(val) {
        return this.countryCodes.filter(option =>
            option.phone_code.toString().indexOf(val.replace('+', '')) === 0);
    }

    onLoad() {
        this.role = 'worker';
        // this.value ='all';
        this.filter = this.myOptionsSelected;
        this.getAllWorker();
    };

    cancel() {
        this.scrollToTop();
        setTimeout(() => {
            this.openFormWorker = false;
        }, 500);
    }

    scrollToTop() {
        jQuery('html, body').animate({ scrollTop: 0 }, { duration: 500 });
    }

    scrollToBottom() {
        let x = window.scrollX, y = window.scrollY;
        jQuery('html, body').animate({ scrollTop: this._scrollContainer.nativeElement.scrollHeight + 50 + 50 }, { duration: 500 });
    }

    getAllWorker() {
        this.store.dispatch({
            type: worker.actionTypes.APP_GETALL_WORKER, payload: {
                currentPage: this.page,
                limit: this.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        });
    };

    pageChange(page) {
        this.store.dispatch({
            type: worker.actionTypes.APP_GETALL_WORKER, payload: {
                worker: (this.searchKey != '') ? this.searchKey : undefined,
                currentPage: page.pageIndex + 1,
                limit: page.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        });
        this.pageSize = page.pageSize;
    }

    goToLastPage(index) {
        this._paginator.pageIndex = Math.ceil(this.length / this.pageSize) - 1;
        let page = {
            pageIndex: Math.ceil(this.length / this.pageSize) - 1,
            pageSize: this.pageSize,
            length: this.length
        };
        this.pageChange(page);
        this._paginator._changePageSize(this.pageSize);
    }

    goToFirstPage(index) {
        this._paginator.pageIndex = 0;
        let page = {
            pageIndex: 0,
            pageSize: this.pageSize,
            length: this.length
        };
        this.pageChange(page);
        this._paginator._changePageSize(this.pageSize);
    }

    pageChanged(page) {
        this.page = page;
        this.searchKey = (this.searchKey.length > 0) ? this.searchKey : '';
        this.store.dispatch({
            type: worker.actionTypes.APP_GETALL_WORKER, payload: {
                worker: (this.searchKey != '') ? this.searchKey : undefined,
                currentPage: this.page,
                limit: this.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        });
    }

    showWorkerDetail(data) {
        localStorage.setItem('editWorkerId', data._id);
        this.router.navigate(['pages/users/editworker']);
    }

    SearchWorker(name) {
        this.searchKey = name;
        if (name.length > 0) {
            this.searchFilter = true;
            this.page = 1;
            this.store.dispatch({
                type: worker.actionTypes.SEARCH_WORKER_DETAIL,
                payload: {
                    worker: name,
                    currentPage: 1,
                    limit: this.pageSize,
                    skip: 0,
                    role: this.role,
                    filter: this.filter
                }
            });
        } else if (name.length == 0) {
            this.page = 1;
            this.getAllWorker();
        }
    }

    blockWorkerConfirm(uData) {
        this.store.dispatch({
            type: worker.actionTypes.BLOCK_THIS_WORKER_CONFIRM,
            payload: uData
        });
        this.dialog.open(BlockWorkerModal);
    }

    createWorkerOpen() {
        this.openFormWorker = true;
        this.workerName.reset();
        this.email.reset();
        this.countryCode.reset();
        this.phoneNumber.reset();
        this.scrollToBottom();
    }

    createWorker(formValue) {
        if (formValue.name === '' || formValue.name == null) {
            this.toastrService.clear();
            this.toastrService.error('Name is required', 'Error');
            return;
        }
        if (formValue.email === '' || formValue.email == null) {
            this.toastrService.clear();
            this.toastrService.error('Email is required', 'Error');
            return;
        }
        if (formValue.countryCode === '' || formValue.countryCode == null) {
            this.toastrService.clear();
            this.toastrService.error('Country code is required', 'Error');
            return;
        }
        if (formValue.mobile === '' || formValue.mobile == null) {
            this.toastrService.clear();
            this.toastrService.error('Phone Number is required', 'Error');
            return;
        }
        formValue.deviceType = 'WEB';
        this.updateLoading = true;
        this.store.dispatch({
            type: worker.actionTypes.CREATE_WORKER,
            payload: {
                data: formValue,
                role: 'worker'
            }
        });
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
            if (i == this.optionsModel.length && this.myOptionsSelected[j].id != 'hasCompletedRegistration' && this.myOptionsSelected[j].id != 'isDeleted') {
                this.myOptionsSelected[j].value = 'all';
            }
        }
        this.role = 'worker';
        this.filter = this.myOptionsSelected;
        this.store.dispatch({
            type: worker.actionTypes.APP_GETALL_WORKER,
            payload: {
                currentPage: this.page,
                role: this.role,
                limit: this.pageSize,
                filter: this.filter
            }
        });
        this._paginator.pageIndex = 0;
        this._paginator._changePageSize(this.pageSize);
    }

    sortData(sort: MdSort) {
        const data = this.workers.slice();
        if (!sort.active || sort.direction == '') {
            this.workers = data;
            return;
        }
        this.workers = data.sort((a, b) => {
            let isAsc = sort.direction == 'asc';
            switch (sort.active) {
                case 'id': return compare(a._id, b._id, isAsc);
                case 'name': return compare(a.name, b.name, isAsc);
                case 'email': return compare(a.email, b.email, isAsc);
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

    _keyPressCountryCode(event: any) {
        const pattern = /^([+])?[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
