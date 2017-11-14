import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, NameValidator } from '../../../theme/validators';
import { DataService } from '../../../../services/data-service/data.service';
import * as post from '../../state/post.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';

import 'style-loader!./post-job.scss';

@Component({
    selector: 'post-job',
    templateUrl: 'post-job.html',
})

export class PostJob implements OnInit {

    @ViewChild('inputJobTitle') public _inputJobDetail: ElementRef;
    @ViewChild('inputCategory') public _inputCategory: ElementRef;
    @ViewChild('inputSubCategory') public _inputSubCategory: ElementRef;
    @ViewChild('inputLocationAddress') public _inputLocationAddress: ElementRef;
    @ViewChild('inputStartDate') public _inputStartDate: ElementRef;
    @ViewChild('inputEndDate') public _inputEndDate: ElementRef;
    @ViewChild('inputJobDetails') public _inputJobDetails: ElementRef;
    @ViewChild('inputRateType') public _inputRateType: ElementRef;
    @ViewChild('inputJobRate') public _inputJobRate: ElementRef;
    @ViewChild('inputJobLabours') public _inputJobLabours: ElementRef;
    public form: FormGroup;
    public jobDetail: AbstractControl;
    public category: AbstractControl;
    public subCategory: AbstractControl;
    public categoryId: AbstractControl;
    public subCategoryId: AbstractControl;
    public locationAddress: AbstractControl;
    public startDate: AbstractControl;
    public endDate: AbstractControl;
    public jobDetails: AbstractControl;
    public rateType: AbstractControl;
    public jobRate: AbstractControl;
    public labourCount: AbstractControl;
    public city: AbstractControl;
    public zipCode: AbstractControl;
    public state: AbstractControl;
    public country: AbstractControl;
    public latitude: AbstractControl;
    public longitude: AbstractControl;
    public postStore;
    public categories = [];
    public subCategories = [];
    public rateTypes = [];
    public submitted: boolean = false;
    public minDate = new Date();

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private dataService: DataService
    ) {

        this.form = fb.group({
            'jobDetail': ['', Validators.compose([Validators.required])],
            'category': ['', Validators.compose([Validators.required])],
            'subCategory': ['', Validators.compose([Validators.required])],
            'categoryId': ['', Validators.compose([Validators.required])],
            'subCategoryId': ['', Validators.compose([Validators.required])],
            'locationAddress': ['', Validators.compose([Validators.required])],
            'latitude': [0],
            'longitude': [0],
            'city': ['', Validators.compose([Validators.required])],
            'state': ['', Validators.compose([Validators.required])],
            'zipCode': ['', Validators.compose([Validators.required])],
            'country': ['', Validators.compose([Validators.required])],
            'startDate': ['', Validators.compose([Validators.required])],
            'endDate': ['', Validators.compose([Validators.required])],
            'jobDetails': [''],
            'rateType': ['', Validators.compose([Validators.required])],
            'jobRate': ['', Validators.compose([Validators.required])],
            'labourCount': ['', Validators.compose([Validators.required])]
        });

        this.jobDetail = this.form.controls['jobDetail'];
        this.category = this.form.controls['category'];
        this.subCategory = this.form.controls['subCategory'];
        this.categoryId = this.form.controls['categoryId'];
        this.subCategoryId = this.form.controls['subCategoryId'];
        this.locationAddress = this.form.controls['locationAddress'];
        this.latitude = this.form.controls['latitude'];
        this.longitude = this.form.controls['longitude'];
        this.city = this.form.controls['city'];
        this.state = this.form.controls['state'];
        this.zipCode = this.form.controls['zipCode'];
        this.country = this.form.controls['country'];
        this.startDate = this.form.controls['startDate'];
        this.endDate = this.form.controls['endDate'];
        this.jobDetails = this.form.controls['jobDetails'];
        this.rateType = this.form.controls['rateType'];
        this.jobRate = this.form.controls['jobRate'];
        this.labourCount = this.form.controls['labourCount'];

        this.rateTypes = [
            'HOURLY',
            'DAILY',
            'WEEKLY',
            'MONTHLY'
        ];

        this.postStore = this.store
            .select('post')
            .subscribe((res: any) => {
                if (res) {
                    if (res.categories) {
                        this.categories = [];
                        for (let i = 0; i < res.categories.length; i++) {
                            this.categories.push(res.categories[i]);
                        }
                    }
                    if (res.subCategories) {
                        this.subCategories = [];
                        for (let i = 0; i < res.subCategories.length; i++) {
                            this.subCategories.push(res.subCategories[i]);
                        }
                    }
                }
            });
    };

    ngOnInit() {
        this.store.dispatch({
            type: post.actionTypes.APP_GET_CATEGORIES,
            payload: {}
        });
    }

    ngOnDestroy() {
        if (this.postStore) {
            this.postStore.unsubscribe();
        }
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
        this.locationAddress.setValue(formattedAddress);
        this.latitude.setValue(latitude);
        this.longitude.setValue(longitude);
        this.city.setValue(city);
        this.state.setValue(state);
        this.zipCode.setValue(postal);
        this.country.setValue(country);
    }

    changeCategory(event, data) {
        if (event && event.isUserInput) {
            this.categoryId.setValue(data._id);
            this.subCategories = [];
            this.store.dispatch({
                type: post.actionTypes.APP_GET_SUB_CATEGORIES,
                payload: { id: data._id }
            });
        }
    }

    changeSubCategory(event, data) {
        if (event && event.isUserInput) {
            this.subCategoryId.setValue(data._id);
        }
    }

    changeRateType(event, data) {
        if (event && event.isUserInput) {

        }
    }

    postJob() {
        this.submitted = true;

        if (!this.jobDetail.value) {
            this.toastrService.clear();
            this.toastrService.error('Job title is required', 'Error');
            if (this._inputJobDetail) {
                this._inputJobDetail.nativeElement.focus();
            }
            return;
        }
        if (!this.category.value) {
            this.toastrService.clear();
            this.toastrService.error('Category is required', 'Error');
            return;
        }
        if (!this.subCategory.value) {
            this.toastrService.clear();
            this.toastrService.error('Sub category is required', 'Error');
            return;
        }
        if (!this.locationAddress.value) {
            this.toastrService.clear();
            this.toastrService.error('Location is required', 'Error');
            if (this._inputLocationAddress) {
                this._inputLocationAddress.nativeElement.focus();
            }
            return;
        }
        if (!this.startDate.value) {
            this.toastrService.clear();
            this.toastrService.error('Start date is required', 'Error');
            if (this._inputStartDate) {
                this._inputStartDate.nativeElement.focus();
            }
            return;
        }
        if (!this.endDate.value) {
            this.toastrService.clear();
            this.toastrService.error('End date is required', 'Error');
            if (this._inputEndDate) {
                this._inputEndDate.nativeElement.focus();
            }
            return;
        }
        if (!this.rateType.value) {
            this.toastrService.clear();
            this.toastrService.error('Rate type is required', 'Error');
            return;
        }
        if (!this.jobRate.value) {
            this.toastrService.clear();
            this.toastrService.error('Rate is required', 'Error');
            if (this._inputJobRate) {
                this._inputJobRate.nativeElement.focus();
            }
            return;
        }
        if (!this.labourCount.value) {
            this.toastrService.clear();
            this.toastrService.error('Number of labours is required', 'Error');
            if (this._inputJobLabours) {
                this._inputJobLabours.nativeElement.focus();
            }
            return;
        }

        let locationDetails = {
            latitude: this.latitude.value,
            longitude: this.longitude.value,
            addressLine1: this.locationAddress.value,
            addressLine2: this.locationAddress.value,
            city: this.city.value,
            cityShort: this.city.value,
            state: this.state.value,
            stateShort: this.state.value,
            country: this.country.value,
            zipCode: this.zipCode.value
        };

        if(!this.locationAddress.value || this.locationAddress.value == '' || this.locationAddress.value == null) {
            delete locationDetails.addressLine1;
            delete locationDetails.addressLine2;
        }
        if(!this.city.value || this.city.value == '' || this.city.value == null) {
            delete locationDetails.city;
            delete locationDetails.cityShort;
        }
        if(!this.state.value || this.state.value == '' || this.state.value == null) {
            delete locationDetails.state;
            delete locationDetails.stateShort;
        }
        if(!this.zipCode.value || this.zipCode.value == '' || this.zipCode.value == null) {
            delete locationDetails.zipCode;
        }
        if(!this.country.value || this.country.value == '' || this.country.value == null) {
            delete locationDetails.country;
        }

        let data = {
            title: this.jobDetail.value,
            employerAddress: locationDetails,
            categoryId: this.categoryId.value,
            subCategoryId: this.subCategoryId.value,
            jobDetails: this.jobDetails.value,
            startDate: this.getDateString(this.startDate.value),
            endDate: this.getDateString(this.endDate.value),
            rateType: this.rateType.value,
            rate: this.jobRate.value,
            requiredLabourers: this.labourCount.value
        };

        if (!this.jobDetails.value || this.jobDetails.value == '' || this.jobDetails.value == null) {
            delete data.jobDetails;
        }

        this.store.dispatch({
            type: post.actionTypes.APP_POST_JOB,
            payload: data
        });
    }

    getDateString(date) {
        let localDate = new Date();
        if (date) {
            localDate = new Date(date);
        }
        let year = localDate.getFullYear().toString();
        let month = (localDate.getMonth() + 1).toString();
        let day = localDate.getDate().toString();
        return (year + '-' + month + '-' + day);
    }

    _keyPressNumber(event: any) {
        const pattern = /^[0-9]*$/;
        let inputChar = event.target.value + String.fromCharCode(event.charCode);
        if (event.charCode != 0 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

}