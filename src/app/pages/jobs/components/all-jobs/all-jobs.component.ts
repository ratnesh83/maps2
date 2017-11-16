import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
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
    public categoryId;
    public center;
    public latitude;
    public longitude;
    public city;
    public state;
    public country;
    public zipCode;
    public addressType;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private cdRef: ChangeDetectorRef,
        private dataService: DataService
    ) {
        this.addressType = 'COUNTRY';
        this.center = '30.71889493430725, 76.81024353951216';

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

        this.jobStore = this.store
            .select('job')
            .subscribe((res: any) => {
                if (res) {
                    if (res.categories) {
                        this.categories = [];
                        for (let i = 0; i < res.categories.length; i++) {
                            this.categories.push(res.categories[i]);
                            this.selectedCategory = this.categories[0].name;
                            this.categoryId = this.categories[0]._id;
                        }
                        for (let i = 0; i < this.categories.length; i++) {
                            if (this.dataService.getCategoryId() == this.categories[i]._id) {
                                this.selectedCategory = this.categories[i].name;
                                this.categoryId = this.categories[i]._id;
                            }
                        }
                    }
                    this.count = res.count;
                    console.log(res);
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

        if (this.dataService.getCategoryId()) {
            this.categoryId = this.dataService.getCategoryId();
        }

        if (navigator.geolocation) {
            let self = this;
            navigator.geolocation.getCurrentPosition((response) => {
                self.showPosition(response, self);
            });
        }
    };

    ngOnInit() {
        this.store.dispatch({
            type: job.actionTypes.APP_GET_CATEGORIES,
            payload: {}
        });
    }

    showPosition(position, self) {
        if (position && position.coords) {
            // let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // self.center = '\'' + position.coords.latitude + ','  + position.coords.longitude;
            let latlng = new google.maps.LatLng(30.71889493430725, 76.81024353951216);
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        self.searchLocation = results[0].formatted_address;
                        let addressComponents = results[0].address_components;
                        let latitude = results[0].geometry.location.lat();
                        let longitude = results[0].geometry.location.lng();
                        let formattedAddress = results[0].formatted_address;
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
                        self.latitude = latitude;
                        self.longitude = longitude;
                        self.city = city;
                        self.state = state;
                        self.country = country;
                        self.zipCode = postal;
                        if (postal) {
                            self.addressType = 'ZIPCODE';
                        } else if (city) {
                            self.addressType = 'CITY';
                        } else if (state) {
                            self.addressType = 'STATE';
                        } else if (country) {
                            self.addressType = 'COUNTRY';
                        }
                        let address = {
                            city: city,
                            cityShort: city,
                            state: state,
                            stateShort: state,
                            country: country,
                            zipCode: postal,
                            latitude: latitude,
                            longitude: longitude
                        };
                        if (!city || city == null || city == undefined) {
                            delete address.city;
                            delete address.cityShort;
                        }
                        if (!state || state == null || state == undefined) {
                            delete address.state;
                            delete address.stateShort;
                        }
                        if (!postal || postal == null || postal == undefined) {
                            delete address.zipCode;
                            delete address.zipCode;
                        }
                        let data = {
                            latitude: latitude,
                            longitude: longitude,
                            categoryId: self.categoryId,
                            addressType: self.addressType,
                            address: address
                        };
                        self.getAllJobs(data);
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

    getAllJobs(data) {
        this.store.dispatch({
            type: job.actionTypes.APP_GETALL_JOB, payload: {
                data: data
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
            console.log(data);
            this.categoryId = data._id;
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
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = postal;
        if (postal) {
            this.addressType = 'ZIPCODE';
        } else if (city) {
            this.addressType = 'CITY';
        } else if (state) {
            this.addressType = 'STATE';
        } else if (country) {
            this.addressType = 'COUNTRY';
        }
        let address = {
            city: city,
            cityShort: city,
            state: state,
            stateShort: state,
            country: country,
            zipCode: postal,
            latitude: latitude,
            longitude: longitude
        };
        if (!city || city == null || city == undefined) {
            delete address.city;
            delete address.cityShort;
        }
        if (!state || state == null || state == undefined) {
            delete address.state;
            delete address.stateShort;
        }
        if (!postal || postal == null || postal == undefined) {
            delete address.zipCode;
            delete address.zipCode;
        }
        let data = {
            latitude: latitude,
            longitude: longitude,
            categoryId: this.categoryId,
            addressType: this.addressType,
            address: address
        };
        this.getAllJobs(data);
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