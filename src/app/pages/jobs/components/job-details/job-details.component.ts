import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as job from '../../state/job.actions';
import * as app from '../../../../state/app.actions';
import * as auth from '../../../../auth/state/auth.actions';
import { JwtHelper } from 'angular2-jwt';
import { DataService } from '../../../../services/data-service/data.service';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';

import 'style-loader!./job-details.scss';

@Component({
    selector: 'job-details',
    templateUrl: 'job-details.html',
})

export class JobDetails implements OnInit {

    public job;
    public labours;
    public showPhone: boolean = false;
    public showEmail: boolean = false;
    public postStore;
    public storeData;
    public jwtHelper: JwtHelper = new JwtHelper();
    public user;
    public canApply;
    public address;
    public latitude;
    public longitude;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private cdRef: ChangeDetectorRef,
        private dataService: DataService
    ) {

        this.storeData = this.store
            .select('auth')
            .subscribe((res: any) => {
                if (res && res.userDetails) {
                    this.address = res.userDetails.locationDetails;
                    if (this.address && this.address.location) {
                        this.latitude = this.address.location.coordinates[1];
                        this.longitude = this.address.location.coordinates[0];
                    }
                }
            });

        this.postStore = this.store
            .select('job')
            .subscribe((res: any) => {
                if (res) {
                    this.job = res.job;
                    this.canApply = res.canApply;
                }
                if (res) {
                    this.labours = res.labours;
                    if (this.labours) {
                        for (let i = 0; i < this.labours.length; i++) {
                            this.labours[i].showPhone = false;
                            this.labours[i].showEmail = false;
                        }
                    }
                }
            });
    };

    ngOnInit() {
        this.getPostDetails();
        let token = localStorage.getItem('tokenSession');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
            this.store.dispatch({
                type: auth.actionTypes.AUTH_GET_USER_DETAILS_BY_ID,
                payload: {
                    userId: this.user._id
                }
            });
            this.store.dispatch({
                type: job.actionTypes.APP_CHECK_APPLY,
                payload: {
                    jobId: this.dataService.getData('jobId'),
                    laborId: this.user._id
                }
            });
        }
    }

    viewProfile(id) {
        // this.dataService.setData('userId', id);
        this.router.navigate(['/pages/settings']);
    }

    ngOnDestroy() {
        if (this.postStore) {
            // this.postStore.unsubscribe();
        }
        if (this.storeData) {
            // this.storeData.unsubscribe();
        }
        this.dataService.removeData('jobId');
    }

    getPostDetails() {
        this.store.dispatch({
            type: job.actionTypes.APP_GET_JOB, payload: {
                jobId: this.dataService.getData('jobId')
            }
        });
    }

    showAddress(address, city, zipCode, state, country): String {
        let returnAddress;
        if (address) {
            returnAddress = address;
            if (city && address.toString().toLowerCase().indexOf(city.toString().toLowerCase()) == -1) {
                returnAddress = returnAddress + ', ' + city;
            }
            if (zipCode && address.indexOf(zipCode) != -1) {
                returnAddress = returnAddress + ', ' + zipCode;
            }
            if (state && state.toString().toLowerCase() != city.toString().toLowerCase() && address.toString().toLowerCase().indexOf(state.toString().toLowerCase()) == -1) {
                returnAddress = returnAddress + ', ' + state;
            }
            if (country && address.toString().toLowerCase().indexOf(country.toString().toLowerCase()) == -1) {
                returnAddress = returnAddress + ', ' + country;
            }
        }
        return returnAddress;
    }

    showPhoneInfo(id) {
        if (this.labours && this.labours[id]) {
            this.labours[id].showPhone = true;
        }
    }

    showEmailInfo(id) {
        if (this.labours && this.labours[id]) {
            this.labours[id].showEmail = true;
        }
    }

    cancelJob() {
        let address = this.address;
        address.latitude = this.latitude;
        address.longitude = this.longitude;
        delete address.location;
        this.store.dispatch({
            type: job.actionTypes.APP_ACCEPT_JOB, payload: {
                jobId: this.dataService.getData('jobId'),
                action: 'CANCELLED_BY_LABOUR',
                labourAddress: address
            }
        });
    }

    applyJob() {
        let address = this.address;
        address.latitude = this.latitude;
        address.longitude = this.longitude;
        delete address.location;
        this.store.dispatch({
            type: job.actionTypes.APP_ACCEPT_JOB, payload: {
                jobId: this.dataService.getData('jobId'),
                action: 'ACCEPTED_BY_LABOUR',
                labourAddress: address
            }
        });
    }

}