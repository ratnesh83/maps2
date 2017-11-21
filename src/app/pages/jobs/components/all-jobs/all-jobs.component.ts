import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
import * as job from '../../state/job.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { EmployerDetailDialog } from '../user-detail-dialog/user-detail-dialog.component';
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
    public bounds;
    public map: google.maps.Map;
    public zoom = 13;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private dataService: DataService,
        private dialog: MdDialog
    ) {
        this.addressType = 'COUNTRY';
        this.bounds = new google.maps.LatLngBounds();

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
                        if (res.getJobCategoryHit) {
                            this.categories = [];
                            for (let i = 0; i < res.categories.length; i++) {
                                this.categories.push(res.categories[i]);
                            }
                        }
                        if (!res.getJobHit && res.getJobCategoryHit) {
                            for (let i = 0; i < this.categories.length; i++) {
                                if (this.dataService.getCategoryId() == this.categories[i]._id) {
                                    this.selectedCategory = this.categories[i].name;
                                    this.categoryId = this.categories[i]._id;
                                } else if (i == this.categories.length) {
                                    this.selectedCategory = this.categories[0].name;
                                    this.categoryId = this.categories[0]._id;
                                }
                            }
                        }
                    }

                    if (res.jobs && res.getJobHit) {
                        this.count = res.count;
                        this.jobs = [];
                        for (let i = 0; i < res.jobs.length; i++) {
                            let coordinates = [0, 0];
                            if (res.jobs[i].employerAddress && res.jobs[i].employerAddress.location) {
                                coordinates = [res.jobs[i].employerAddress.location.coordinates[1], res.jobs[i].employerAddress.location.coordinates[0]];
                                this.bounds.extend(new google.maps.LatLng(coordinates[0], coordinates[1]));
                                if (this.map) {
                                    this.map.fitBounds(this.bounds);
                                }
                            }
                            let job = {
                                id: res.jobs[i]._id,
                                employerName: res.jobs[i].employerId ? res.jobs[i].employerId.fullName ? res.jobs[i].employerId.fullName : (res.jobs[i].employerId.lastName ? (res.jobs[i].employerId.firstName + ' ' + res.jobs[i].employerId.lastName) : res.jobs[i].employerId.firstName) : null,
                                employerEmail: res.jobs[i].employerId ? res.jobs[i].employerId.email : null,
                                employerPhoneNumber: res.jobs[i].employerId ? res.jobs[i].employerId.countryCode + res.jobs[i].employerId.phoneNumber : null,
                                isPhoneNumberHidden: res.jobs[i].employerId ? res.jobs[i].employerId.isPhoneNumberHidden : false,
                                profilePicture: res.jobs[i].employerId ? res.jobs[i].employerId.profilePicture ? res.jobs[i].employerId.profilePicture.thumb ? res.jobs[i].employerId.profilePicture.thumb : 'assets/img/user.png' : 'assets/img/user.png' : 'assets/img/user.png',
                                categoryImage: res.jobs[i].categoryId ? res.jobs[i].categoryId.image ? res.jobs[i].categoryId.image.thumb ? res.jobs[i].categoryId.image.thumb : 'assets/img/image-placeholder.jpg' : 'assets/img/image-placeholder.jpg' : 'assets/img/image-placeholder.jpg',
                                coordinates: coordinates,
                                distance: res.jobs[i].distance,
                                rate: res.jobs[i].rate,
                                rateType: res.jobs[i].rateType,
                                title: res.jobs[i].title,
                                address: res.jobs[i].employerAddress ? res.jobs[i].employerAddress.addressLine1 + ', ' + res.jobs[i].employerAddress.city : '',
                                actualAddress: res.jobs[i].employerAddress,
                                phoneNumber: res.jobs[i].employerId ? res.jobs[i].employerId.countryCode + ' ' + res.jobs[i].employerId.phoneNumber : '',
                                email: res.jobs[i].employerId ? res.jobs[i].employerId.email : ''
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
            navigator.geolocation.getCurrentPosition((response) => {
                this.showPosition(response);
            }, (error) => {
                this.toastrService.clear();
                this.toastrService.error(error.message || 'Error in fetching your current location', 'Error');
            });
        } else {
            this.toastrService.clear();
            this.toastrService.warning('Geolocation is not supported by this browser', 'Error');
        }
    }

    ngOnInit() {
        this.store.dispatch({
            type: job.actionTypes.APP_GET_CATEGORIES_JOB,
            payload: {}
        });
    }

    createMapCluster(markers) {
        for (let i = 0; i < markers.length; i++) {
            for (let j = 0; j < markers.length; j++) {
                if (markers[i] == markers[j]) {

                    //let newLatLng = new google.maps.LatLng(markers[i].coordinates[0] + i /10000, markers[i].coordinates[1]);
                    markers[i].coordinates = [markers[i].coordinates[0] + i / 100000, markers[i].coordinates[1]];
                    console.log(markers[i].coordinates);
                }
            }
        }
    }

    showPosition(position) {
        if (position && position.coords) {
            let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let geocoder = new google.maps.Geocoder();
            this.geocoder(geocoder, latlng)
                .then((result) => {
                    let results = result;
                    if (results[0]) {
                        this.searchLocation = results[0].formatted_address;
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
                        this.latitude = latitude;
                        this.longitude = longitude;
                        this.city = city;
                        this.state = state;
                        this.country = country;
                        this.zipCode = postal;
                        if (postal) {
                            this.addressType = 'ZIPCODE';
                            this.zoom = 13;
                        } else if (city) {
                            this.addressType = 'CITY';
                            this.zoom = 12;
                        } else if (state) {
                            this.addressType = 'STATE';
                            this.zoom = 11;
                        } else if (country) {
                            this.addressType = 'COUNTRY';
                            this.zoom = 6;
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
                })
                .catch((error: any) => {
                    // console.error(error);
                });
        }
    }

    geocoder(geocoder, latlng): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                geocoder.geocode({ 'location': latlng }, (result: any) => {
                    if (!result) {
                        reject();
                    } else if (result.error) {
                        reject(result.error);
                    } else {
                        resolve(result);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    ngOnDestroy() {
        if (this.jobStore) {
            // this.jobStore.unsubscribe();
        }
    }

    getAllJobs(data) {
        this.store.dispatch({
            type: job.actionTypes.APP_GETALL_JOB, payload: {
                data: data
            }
        });
    }

    showJobDetail(job) {
        this.dataService.setData('jobId', job.id);
        this.router.navigate(['pages/jobs/jobdetails']);
    }

    showUserDetail(user) {
        let dialogRef = this.dialog.open(EmployerDetailDialog);
        dialogRef.componentInstance.userDetails = user;
    }

    changeMap(lat, lng) {
        this.bounds = new google.maps.LatLngBounds();
        this.bounds.extend(new google.maps.LatLng(lat, lng));
        if (this.map) {
            this.map.fitBounds(this.bounds);
            this.map.setZoom(this.zoom);
        }
        this.center = lat + ', ' + lng;
    }

    changeCategory(event, data) {
        if (event && event.isUserInput) {
            this.categoryId = data._id;
            let address = {
                city: this.city,
                cityShort: this.city,
                state: this.state,
                stateShort: this.state,
                country: this.country,
                zipCode: this.zipCode,
                latitude: this.latitude,
                longitude: this.longitude
            };
            if (!this.city || this.city == null || this.city == undefined) {
                delete address.city;
                delete address.cityShort;
            }
            if (!this.state || this.state == null || this.state == undefined) {
                delete address.state;
                delete address.stateShort;
            }
            if (!this.zipCode || this.zipCode == null || this.zipCode == undefined) {
                delete address.zipCode;
                delete address.zipCode;
            }
            let dataToSend = {
                latitude: this.latitude,
                longitude: this.longitude,
                categoryId: this.categoryId,
                addressType: this.addressType,
                address: address
            };
            this.getAllJobs(dataToSend);
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
            this.zoom = 13;
        } else if (city) {
            this.addressType = 'CITY';
            this.zoom = 12;
        } else if (state) {
            this.addressType = 'STATE';
            this.zoom = 11;
        } else if (country) {
            this.addressType = 'COUNTRY';
            this.zoom = 6;
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
                categoryImage: data.categoryImage,
                distance: data.distance ? data.distance.toFixed(1) : data.distance,
                address: data.address,
                rate: data.rate,
                rateType: data.rateType,
                title: data.title,
                email: data.email,
                phoneNumber: data.phoneNumber,
                actualAddress: data.actualAddress
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

    onMapReady(map) {
        this.map = map;
    }

    onIdle(event) {

    }

}