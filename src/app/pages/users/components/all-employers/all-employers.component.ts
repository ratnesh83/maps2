import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
    MdSort,
    MdDialog,
    MdPaginator
} from '@angular/material';
import * as employer from '../../state/user.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { BlockEmployerModal } from '../block-employer-modal/block-employer-modal.component';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./all-employers.scss';

@Component({
    selector: 'all-employers',
    templateUrl: 'all-employers.html',
})

export class AllEmployers implements OnInit {
    @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
    @ViewChild('employersPaginator') private _paginator: MdPaginator;
    public employers;
    public page = 1;
    public limit;
    public searchKey = '';
    public pageIndex;
    public count: number;
    public activeEmployer;
    public name: string;
    public role: string;
    public searchString: string;
    public searchFilter: boolean;
    public value: 'all';
    public filter;
    public form: FormGroup;
    public empName: AbstractControl;
    public userName: AbstractControl;
    public email: AbstractControl;
    public countryCode: AbstractControl;
    public phoneNumber: AbstractControl;
    public openFormEmployer: boolean = false;
    public updateLoading = false;
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

        this.empName = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.countryCode = this.form.controls['countryCode'];
        this.phoneNumber = this.form.controls['mobile'];

        this.limit = this.pageSize;

        this.store
            .select('employer')
            .subscribe((res: any) => {
                this.employers = res.employers;
                this.count = res.count;
                this.length = this.count;
                this.limit = this.pageSize;
                this.activeEmployer = (res.activeEmployer) ? res.activeEmployer : null;
                this.pageIndex = res.currentPage - 1;
                if(res.countryCodes) {
                    this.countryCodes = res.countryCodes;
                }
                if (res.createEmployer) {
                    this.updateLoading = false;
                    this.scrollToTop();
                    this.empName.reset();
                    this.email.reset();
                    this.countryCode.reset();
                    this.phoneNumber.reset();
                    setTimeout(() => {
                        this.openFormEmployer = false;
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
            type: employer.actionTypes.GET_COUNTRY_CODE
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
            option.phone_code.toString().indexOf(val.replace('+','')) === 0);
    }

    onLoad() {
        this.role = 'employer';
        // this.value ='all';
        this.filter = this.myOptionsSelected;
        this.getAllEmployer();
    };

    getAllEmployer() {
        this.store.dispatch({
            type: employer.actionTypes.APP_GETALL_EMPLOYER, payload: {
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
            type: employer.actionTypes.APP_GETALL_EMPLOYER, payload: {
                employer: (this.searchKey != '') ? this.searchKey : undefined,
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
            type: employer.actionTypes.APP_GETALL_EMPLOYER, payload: {
                employer: (this.searchKey != '') ? this.searchKey : undefined,
                currentPage: this.page,
                limit: this.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        });
    }

    showEmployerDetail(data) {
        localStorage.setItem('editEmployerId', data._id);
        this.router.navigate(['pages/users/editemployer']);
    }

    SearchEmployer(name) {
        this.searchKey = name;
        if (name.length > 0) {
            this.searchFilter = true;
            this.page = 1;
            this.store.dispatch({
                type: employer.actionTypes.SEARCH_EMPLOYER_DETAIL,
                payload: {
                    employer: name,
                    currentPage: 1,
                    limit: this.pageSize,
                    skip: 0,
                    role: this.role,
                    filter: this.filter
                }
            });
        } else if (name.length == 0) {
            this.page = 1;
            this.getAllEmployer();
        }
    }

    blockEmployerConfirm(uData) {
        this.store.dispatch({
            type: employer.actionTypes.BLOCK_THIS_EMPLOYER_CONFIRM,
            payload: uData
        });
        this.dialog.open(BlockEmployerModal);
    }

    createEmployerOpen() {
        this.openFormEmployer = true;
        this.empName.reset();
        this.email.reset();
        this.countryCode.reset();
        this.phoneNumber.reset();
        this.scrollToBottom();
    }

    createEmployer(formValue) {
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
            type: employer.actionTypes.CREATE_EMPLOYER,
            payload: {
                data: formValue,
                role: 'worker'
            }
        });
    }

    cancel() {
        this.scrollToTop();
        setTimeout(() => {
            this.openFormEmployer = false;
        }, 500);
    }

    scrollToTop() {
        jQuery('html, body').animate({ scrollTop: 0 }, { duration: 500 });
    }

    scrollToBottom() {
        jQuery('html, body').animate({ scrollTop: this._scrollContainer.nativeElement.scrollHeight + 50 + 50 }, { duration: 500 });
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
            if (i == this.optionsModel.length && this.myOptionsSelected[j].id != 'isDeleted') {
                this.myOptionsSelected[j].value = 'all';
            }
        }
        this.role = 'employer';
        this.filter = this.myOptionsSelected;
        this.store.dispatch({
            type: employer.actionTypes.APP_GETALL_EMPLOYER,
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
        const data = this.employers.slice();
        if (!sort.active || sort.direction == '') {
            this.employers = data;
            return;
        }
        this.employers = data.sort((a, b) => {
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