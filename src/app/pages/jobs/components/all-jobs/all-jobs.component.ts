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
import * as job from '../../state/job.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';

import 'style-loader!./all-jobs.scss';

@Component({
    selector: 'all-jobs',
    templateUrl: 'all-jobs.html',
})

export class AllJobs implements OnInit {
    @ViewChild('scrollBottom') private _scrollContainer: ElementRef;
    @ViewChild('jobsPaginator') private _paginator: MdPaginator;
    public jobs;
    public page = 1;
    public limit;
    public searchKey = '';
    public pageIndex;
    public count: number;
    public activeJob;
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
    public openFormJob: boolean = false;
    public updateLoading = false;
    public jobStore;
    
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

        ];
        this.myOptionsSelected = [
            { id: 'isAdminVerified', value: 'all' },
            { id: 'isDeleted', value: false },
            { id: 'isBlocked', value: 'all' }
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

        this.jobStore = this.store
            .select('job')
            .subscribe((res: any) => {
                this.jobs = res.jobs;
                this.count = res.count;
                this.length = this.count;
                this.limit = this.pageSize;
                this.activeJob = (res.activeJob) ? res.activeJob : null;
                this.pageIndex = res.currentPage - 1;
                if (res.createJob) {
                    this.updateLoading = false;
                    this.scrollToTop();
                    this.empName.reset();
                    this.email.reset();
                    this.countryCode.reset();
                    this.phoneNumber.reset();
                    setTimeout(() => {
                        this.openFormJob = false;
                    }, 500);
                }
            });
    };

    ngOnInit() {
        this.onLoad();
    }

    ngOnDestroy() {
        if (this.jobStore) {
            // this.jobStore.unsubscribe();
        }
    }

    onLoad() {
        this.role = 'all';
        this.filter = this.myOptionsSelected;
        this.getAllJobs();
    };

    getAllJobs() {
        this.store.dispatch({
            type: job.actionTypes.APP_GETALL_JOB, payload: {
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
            type: job.actionTypes.APP_GETALL_JOB, payload: {
                job: (this.searchKey != '') ? this.searchKey : undefined,
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
            type: job.actionTypes.APP_GETALL_JOB, payload: {
                job: (this.searchKey != '') ? this.searchKey : undefined,
                currentPage: this.page,
                limit: this.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        });
    }

    showJobDetail(data) {
        //localStorage.setItem('viewJobId', data._id);
        //this.router.navigate(['pages/users/viewjob']);
    }

    SearchJob(name) {
        this.searchKey = name;
        if (name.length > 0) {
            this.searchFilter = true;
            this.page = 1;
            this.store.dispatch({
                type: job.actionTypes.SEARCH_JOB_DETAIL,
                payload: {
                    job: name,
                    currentPage: 1,
                    limit: this.pageSize,
                    skip: 0,
                    role: this.role,
                    filter: this.filter
                }
            });
        } else if (name.length == 0) {
            this.page = 1;
            this.getAllJobs();
        }
    }

    blockJobConfirm(uData) {

    }

    createJobOpen() {
        this.openFormJob = true;
        this.empName.reset();
        this.email.reset();
        this.countryCode.reset();
        this.phoneNumber.reset();
        this.scrollToBottom();
    }

    createJob(formValue) {
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
            type: job.actionTypes.CREATE_JOB,
            payload: {
                data: formValue,
                role: 'all'
            }
        });
    }

    cancel() {
        this.scrollToTop();
        setTimeout(() => {
            this.openFormJob = false;
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
        this.role = 'all';
        this.filter = this.myOptionsSelected;
        this.store.dispatch({
            type: job.actionTypes.APP_GETALL_JOB,
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
        const data = this.jobs.slice();
        if (!sort.active || sort.direction == '') {
            this.jobs = data;
            return;
        }
        this.jobs = data.sort((a, b) => {
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