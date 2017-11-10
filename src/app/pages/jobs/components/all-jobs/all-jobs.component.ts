import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
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
import { NguiMapComponent } from '@ngui/map';

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
    public searchLocation;
    public positions = [];
    public markers = [];
    public info;
    public updateLoading = false;
    public jobStore;
    public categories = [];
    public center;

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
        this.center = '30.7333148, 76.7794179';
        let marker = [
            30.7333148,
            76.7794179
        ];

        let marker2 = [
            30.7333148,
            76.7894179
        ];

        this.markers.push(marker);
        this.markers.push(marker2);
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
        this.categories = [
            'Health Care',
            'Construction',
            'Engineering'
        ];

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

    }

    ngOnDestroy() {
        if (this.jobStore) {
            // this.jobStore.unsubscribe();
        }
    }

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
    }

    changeMap(lat, lng) {
        this.center = lat + ', ' + lng;
    }

    getAddress(event) {
        let addressComponents = event.address_components;
        let latitude = event.geometry.location.lat();
        let longitude = event.geometry.location.lng();
        let formattedAddress = event.formatted_address;
        let locationName = event.streetAddress;
        let route = '';
        let locality = '';
        let city = '';
        let state = '';
        let country = '';
        let postal = '';
        for (let i = 0; i < addressComponents.length; i++) {
            let types = addressComponents[i].types;
            for (let j = 0; j < types.length; j++) {
                if (types[j] == 'administrative_area_level_1') {
                    state = addressComponents[i].long_name;
                } else if (types[j] == 'administrative_area_level_2') {
                    city = addressComponents[i].long_name;
                } else if (types[j] == 'locality') {
                    locality = addressComponents[i].long_name;
                } else if (types[j] == 'country') {
                    country = addressComponents[i].long_name;
                } else if (types[j] == 'postal_code') {
                    postal = addressComponents[i].long_name;
                } else if (types[j] == 'route') {
                    route = addressComponents[i].long_name;
                }
            }
        }
        this.searchLocation = formattedAddress;
        this.changeMap(latitude, longitude);
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

    showMarkerInfo({ target: marker }, data) {
        this.info = data;
        marker.nguiMapComponent.openInfoWindow('iw', marker);
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