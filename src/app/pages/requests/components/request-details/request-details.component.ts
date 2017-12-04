import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as request from '../../state/request.actions';
import * as app from '../../../../state/app.actions';
import * as auth from '../../../../auth/state/auth.actions';
import { JwtHelper } from 'angular2-jwt';
import { DataService } from '../../../../services/data-service/data.service';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';

import 'style-loader!./request-details.scss';

@Component({
    selector: 'request-details',
    templateUrl: 'request-details.html',
})

export class RequestDetails implements OnInit {

    public request;
    public labours;
    public showPhone: boolean = false;
    public showEmail: boolean = false;
    public requestStore;
    public storeData;
    public jwtHelper: JwtHelper = new JwtHelper();
    public user;
    public address;
    public latitude;
    public longitude;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
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

        this.requestStore = this.store
            .select('request')
            .subscribe((res: any) => {
                if (res) {
                    this.request = res.request;
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
        this.getRequestDetails();
        let token = localStorage.getItem('tokenSession');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
            this.store.dispatch({
                type: auth.actionTypes.AUTH_GET_USER_DETAILS_BY_ID,
                payload: {
                    userId: this.user._id
                }
            });
        }
    }

    viewProfile(id) {
        // this.dataService.setData('userId', id);
        this.router.navigate(['/pages/settings']);
    }

    ngOnDestroy() {
        if (this.requestStore) {
            this.requestStore.unsubscribe();
        }
        if (this.storeData) {
            this.storeData.unsubscribe();
        }
        // this.dataService.removeData('requestId');
    }

    getRequestDetails() {
        this.store.dispatch({
            type: request.actionTypes.APP_GET_REQUEST, payload: {
                requestId: this.dataService.getData('requestId')
            }
        });
    }

    showAddress(address, city, zipCode, state, country): String {
        let returnAddress;
        if (address) {
            returnAddress = address;
            if (returnAddress && country && country.toString().toLowerCase() == 'united states') {
                returnAddress = returnAddress.toString().replace(', USA', '');
            }
            if (city && address.toString().toLowerCase().indexOf(city.toString().toLowerCase()) == -1) {
                returnAddress = returnAddress + ', ' + city;
            }
            if (zipCode && address.indexOf(zipCode) == -1) {
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
            type: request.actionTypes.APP_CANCEL_JOB, payload: {
                jobId: this.dataService.getData('requestId'),
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
            type: request.actionTypes.APP_ACCEPT_JOB, payload: {
                jobId: this.dataService.getData('requestId'),
                action: 'ACCEPTED_BY_LABOUR',
                labourAddress: address
            }
        });
    }

}