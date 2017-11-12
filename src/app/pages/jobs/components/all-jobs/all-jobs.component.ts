import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
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

    public jobs;
    public page = 1;
    public limit;
    public pageIndex;
    public count: number;
    public name: string;
    public role: string;
    public value: 'all';
    public filter;
    public showPhone: boolean = false;
    public showEmail: boolean = false;
    public searchLocation;
    public positions = [];
    public markers = [];
    public info;
    public jobStore;
    public selectedCategory;
    public categories = [];
    public center;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private cdRef: ChangeDetectorRef
    ) {
        this.center = '30.71889493430725, 76.81024353951216';

        if (navigator.geolocation) {
            let self = this;
            navigator.geolocation.getCurrentPosition((response) => {
                self.showPosition(response, self);
            });
        }

        this.info = {
            employerName: null,
            employerEmail: null,
            employerPhoneNumber: null,
            isPhoneNumberHidden: false,
            profilePicture: null,
            distance: 0,
            address: null,
            rate: 0,
            requiredLabourers: 0,
        };

        this.categories = [
            'Health Care',
            'Construction',
            'Engineering'
        ];

        this.selectedCategory = this.categories[0];

        this.jobStore = this.store
            .select('job')
            .subscribe((res: any) => {
                if (res) {
                    this.count = res.count;
                    this.jobs = [];
                    if (res.jobs) {

                        for (let i = 0; i < res.jobs.length; i++) {
                            let coordinates = [0, 0];
                            if (res.jobs[i].employerAddress && res.jobs[i].employerAddress.location) {
                                coordinates = [res.jobs[i].employerAddress.location.coordinates[1], res.jobs[i].employerAddress.location.coordinates[0]];
                            }
                            let job = {
                                id: res.jobs[i]._id,
                                employerName: res.jobs[i].employerId ? res.jobs[i].employerId.firstName + ' ' + res.jobs[i].employerId.lastName : null,
                                employerEmail: res.jobs[i].employerId ? res.jobs[i].employerId.email : null,
                                employerPhoneNumber: res.jobs[i].employerId ? res.jobs[i].employerId.countryCode + res.jobs[i].employerId.phoneNumber : null,
                                isPhoneNumberHidden: res.jobs[i].employerId ? res.jobs[i].employerId.isPhoneNumberHidden : false,
                                profilePicture: res.jobs[i].employerId ? res.jobs[i].employerId.profilePicture ? res.jobs[i].employerId.profilePicture.original : '' : null,
                                coordinates: coordinates,
                                distance: res.jobs[i].distance,
                                rate: res.jobs[i].rate,
                                rateType: res.jobs[i].rateType,
                                title: res.jobs[i].title,
                                address: res.jobs[i].employerAddress ? res.jobs[i].employerAddress.addressLine1 + ', ' + res.jobs[i].employerAddress.city : ''
                            };
                            this.jobs.push(job);
                        }
                    }
                }
            });
    };

    ngOnInit() {
        this.getAllJobs();
    }

    showPosition(position, self) {
        if (position && position.coords) {
            // let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let latlng = new google.maps.LatLng(30.71889493430725, 76.81024353951216);
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        self.searchLocation = results[0].formatted_address;
                    }
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.jobStore) {
            this.jobStore.unsubscribe();
        }
    }

    getAllJobs() {
        this.store.dispatch({
            type: job.actionTypes.APP_GETALL_JOB, payload: {
                currentPage: this.page,
                limit: 10,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        });
    };

    showJobDetail(data) {
        //localStorage.setItem('viewJobId', data.id);
        //this.router.navigate(['pages/users/viewjob']);
    }

    changeMap(lat, lng) {
        this.center = lat + ', ' + lng;
    }

    changeCategory(event, data) {
        if (event && event.isUserInput) {
            // console.log(data);
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
        this.changeMap(latitude, longitude);
    }

    showMarkerInfo({ target: marker }, data) {
        if (data) {
            this.info = {
                id: data.id,
                employerName: data.employerName,
                employerEmail: data.employerEmail,
                employerPhoneNumber: data.employerPhoneNumber,
                isPhoneNumberHidden: data.isPhoneNumberHidden,
                profilePicture: data.profilePicture,
                distance: data.distance ? data.distance.toFixed(1) : data.distance,
                address: data.address,
                rate: data.rate,
                rateType: data.rateType,
                title: data.title
            };
        }
        this.showPhone = false;
        this.showEmail = false;
        marker.nguiMapComponent.openInfoWindow('iw', marker);
    }

    showPhoneInfo() {
        this.showPhone = true;
    }

    showEmailInfo() {
        this.showEmail = true;
    }

}