import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, NameValidator } from '../../../theme/validators';
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

    @ViewChild('inputJobTitle') public _jobDetail: ElementRef;
    public form: FormGroup;
    public jobDetail: AbstractControl;
    public category: AbstractControl;
    public subCategory: AbstractControl;
    public locationAddress: AbstractControl;
    public startDate: AbstractControl;
    public endDate: AbstractControl;
    public jobDetails: AbstractControl;
    public rateType: AbstractControl;
    public jobRate: AbstractControl;
    public labourCount: AbstractControl;
    public searchLocation;
    public postStore;
    public categories = [];
    public subCategories = [];
    public rateTypes = [];

    constructor(private fb: FormBuilder,
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService
    ) {

        this.form = fb.group({
            'jobDetail': ['', Validators.compose([Validators.required])],
            'category': ['', Validators.compose([Validators.required])],
            'subCategory': ['', Validators.compose([Validators.required])],
            'locationAddress': ['', Validators.compose([Validators.required])],
            'startDate': ['', Validators.compose([Validators.required])],
            'endDate': ['', Validators.compose([Validators.required])],
            'jobDetails': [''],
            'rateType': ['', Validators.compose([Validators.required])],
            'jobRate': [''],
            'labourCount': ['', Validators.compose([Validators.required])]
        });

        this.jobDetail = this.form.controls['jobDetail'];
        this.category = this.form.controls['category'];
        this.subCategory = this.form.controls['subCategory'];
        this.locationAddress = this.form.controls['locationAddress'];
        this.startDate = this.form.controls['startDate'];
        this.endDate = this.form.controls['endDate'];
        this.jobDetails = this.form.controls['jobDetails'];
        this.rateType = this.form.controls['rateType'];
        this.jobRate = this.form.controls['jobRate'];
        this.labourCount = this.form.controls['labourCount'];

        this.categories = [
            'Health Care',
            'Construction',
            'Engineering'
        ];

        this.postStore = this.store
            .select('post')
            .subscribe((res: any) => {
                if (res) {
                    
                }
            });
    };

    ngOnInit() {

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
        this.searchLocation = formattedAddress;
    }

    changeCategory(event, data) {
        if (event && event.isUserInput) {
            // console.log(data);
        }
    }

    postJob() {
        console.log(this.form.value);
    }

}