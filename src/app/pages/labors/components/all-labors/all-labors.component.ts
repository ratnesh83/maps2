import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
import * as labor from '../../state/labor.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { UserDetailDialog } from '../user-detail-dialog/user-detail-dialog.component';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';

import 'style-loader!./all-labors.scss';

@Component({
    selector: 'all-labors',
    templateUrl: 'all-labors.html',
})

export class AllLabors implements OnInit {

    public labors;
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
    public showLoading: boolean = false;
    public searchLocation;
    public positions = [];
    public markers = [];
    public info;
    public laborStore;
    public topListStore;
    public selectedCategory;
    public categories = [];
    public categoryId;
    public center;
    public latitude = 30.7188978;
    public longitude = 76.81029809;
    public city;
    public state;
    public country;
    public zipCode;
    public addressType;
    public bounds;
    public map: google.maps.Map;
    public zoom = 13;
    public topList;

    public companiesNotifications = [];
    public jobsNotifications = [];
    public usersNotifications = [];

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

        this.topListStore = this.store
            .select('topList')
            .subscribe((res: any) => {
                this.topList = res.topList;
                this.companiesNotifications = [];
                this.jobsNotifications = [];
                this.usersNotifications = [];
                if (res.topList) {
                    this.topList = res.topList;

                    if (this.topList.companyName) {
                        let company;
                        for (let i = 0; i < this.topList.companyName.length; i++) {
                            company = {
                                name: this.topList.companyName[i].companyName,
                                createdAt: this.topList.companyName[i].createdAt,
                                picture: this.topList.companyName[i].profilePicture ? this.topList.companyName[i].profilePicture.thumb : 'assets/img/user.png'
                            };
                            this.companiesNotifications.push(company);
                        }
                    }

                    if (this.topList.employers) {
                        let employer;
                        for (let i = 0; i < this.topList.employers.length; i++) {
                            employer = {
                                name: this.topList.employers[i].fullName ? this.topList.employers[i].fullName : this.topList.employers[i].lastName ? this.topList.employers[i].firstName + ' ' + this.topList.employers[i].lastName : this.topList.employers[i].firstName,
                                createdAt: this.topList.employers[i].createdAt,
                                picture: this.topList.employers[i].profilePicture ? this.topList.employers[i].profilePicture.thumb : 'assets/img/user.png'
                            };
                            this.usersNotifications.push(employer);
                        }
                    }

                    if (this.topList.newJobs) {
                        let job;
                        for (let i = 0; i < this.topList.newJobs.length; i++) {
                            job = {
                                name: this.topList.newJobs[i].title,
                                createdAt: this.topList.newJobs[i].createdAt,
                                picture: this.topList.newJobs[i].categoryId ? this.topList.newJobs[i].categoryId.image.thumb : 'assets/img/image-placeholder.jpg'
                            };
                            this.jobsNotifications.push(job);
                        }
                    }
                }
            });

        this.laborStore = this.store
            .select('labor')
            .subscribe((res: any) => {
                if (res) {
                    if (res.categories) {
                        if (res.getLaborCategoryHit) {
                            this.categories = [];
                            for (let i = 0; i < res.categories.length; i++) {
                                this.categories.push(res.categories[i]);
                            }
                        }
                        if (!res.getLaborHit && res.getLaborCategoryHit) {
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

                    if (res.labors && res.getLaborHit) {
                        this.count = res.count;
                        this.labors = [];
                        let labors = [];
                        for (let i = 0; i < res.labors.length; i++) {
                            let coordinates = [0, 0];
                            if (res.labors[i].locationDetails && res.labors[i].locationDetails.location) {
                                coordinates = [res.labors[i].locationDetails.location.coordinates[1], res.labors[i].locationDetails.location.coordinates[0]];
                                this.bounds.extend(new google.maps.LatLng(coordinates[0], coordinates[1]));
                                if (this.map) {
                                    this.map.fitBounds(this.bounds);
                                }
                            }
                            let labor = {
                                id: res.labors[i]._id,
                                employerName: res.labors[i] ? res.labors[i].fullName ? res.labors[i].fullName : (res.labors[i].lastName ? (res.labors[i].firstName + ' ' + res.labors[i].lastName) : res.labors[i].firstName) : null,
                                employerEmail: res.labors[i] ? res.labors[i].email : null,
                                employerPhoneNumber: res.labors[i] ? res.labors[i].countryCode + res.labors[i].phoneNumber : null,
                                isPhoneNumberHidden: res.labors[i] ? res.labors[i].isPhoneNumberHidden : false,
                                profilePicture: res.labors[i] ? res.labors[i].profilePicture ? res.labors[i].profilePicture.thumb ? res.labors[i].profilePicture.thumb : 'assets/img/user.png' : 'assets/img/user.png' : 'assets/img/user.png',
                                categoryImage: res.labors[i].categoryId ? res.labors[i].categoryId.image ? res.labors[i].categoryId.image.thumb ? res.labors[i].categoryId.image.thumb : 'assets/img/image-placeholder.jpg' : 'assets/img/image-placeholder.jpg' : 'assets/img/image-placeholder.jpg',
                                coordinates: coordinates,
                                distance: res.labors[i].distance / 1609.34,
                                rate: res.labors[i].rate,
                                rateType: res.labors[i].rateType,
                                title: res.labors[i].title,
                                address: res.labors[i].locationDetails ? res.labors[i].locationDetails.addressLine1 + ', ' + res.labors[i].locationDetails.city : '',
                                actualAddress: res.labors[i].locationDetails,
                                phoneNumber: res.labors[i].countryCode + ' ' + res.labors[i].phoneNumber,
                                email: res.labors[i].email
                            };
                            // this.labors.push(labor);
                            labors.push(labor);
                        }
                        this.createMapCluster(labors);
                    }
                }
            });

        if (this.dataService.getCategoryId()) {
            this.categoryId = this.dataService.getCategoryId();
        }

        if (navigator.geolocation) {
            this.showLoading = true;
            navigator.geolocation.getCurrentPosition((response) => {
                this.showLoading = false;
                this.showPosition(response);
            }, (error) => {
                this.showLoading = false;
                this.toastrService.clear();
                this.toastrService.error(error.message || 'Error in fetching your current location', 'Error');
            });
        } else {
            this.showLoading = false;
            this.toastrService.clear();
            this.toastrService.warning('Geolocation is not supported by this browser', 'Error');
        }
    };

    ngOnInit() {
        this.store.dispatch({
            type: labor.actionTypes.APP_GET_CATEGORIES_LABOR,
            payload: {}
        });
        this.store.dispatch({
            type: labor.actionTypes.APP_GET_TOP_LIST_COPY,
            payload: {}
        });
    }

    getDuration(time) {
        let timeOfEvent = (new Date()).getTime() - (new Date(time)).getTime();
        let timeDiffMinutes = timeOfEvent / 60000;
        let timeDiffhours = timeDiffMinutes / 60;
        let timeDiffDays = timeDiffhours / 24;
        let timeDiffString = timeDiffMinutes.toString();
        if (timeDiffhours < 1) {
            if (timeDiffMinutes < 2) {
                return '1 min';
            } else {
                return Math.floor(timeDiffMinutes).toString() + ' min';
            }
        } else if (timeDiffDays < 1) {
            if (timeDiffhours < 2) {
                return '1 hr';
            } else {
                return Math.floor(timeDiffhours).toString() + ' hrs';
            }
        } else {
            if (timeDiffDays < 2) {
                return '1 day';
            } else {
                return Math.floor(timeDiffDays).toString() + ' days';
            }
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

    createMapCluster(markers) {
        let min = 0.999999;
        let max = 1.000001;
        for (let i = 0; i < markers.length; i++) {
            for (let j = 0; j < markers.length; j++) {
                if (markers[i] == markers[j]) {
                    let offsetLat = markers[i].coordinates[0] * (Math.random() * (max - min) + min);
                    let offsetLng = markers[i].coordinates[1] * (Math.random() * (max - min) + min);
                    let point = new google.maps.LatLng(offsetLat, offsetLng);
                    markers[i].coordinates = [point.lat(), point.lng()];
                    this.bounds.extend(new google.maps.LatLng(markers[i].coordinates[0], markers[i].coordinates[1]));
                    if (this.map) {
                        this.map.fitBounds(this.bounds);
                    }
                }
            }
            this.labors.push(markers[i]);
        }
    }

    showPosition(position) {
        if (position && position.coords) {
            this.showLoading = true;
            let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let geocoder = new google.maps.Geocoder();
            this.geocoder(geocoder, latlng)
                .then((result) => {
                    this.showLoading = false;
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
                            sortBy: 'DISTANCE',
                            categoryId: this.categoryId,
                            addressType: this.addressType,
                            address: address
                        };
                        this.getAllLabors(data);
                        this.changeMap(latitude, longitude);
                    }
                })
                .catch((error: any) => {
                    this.showLoading = false;
                    // console.error(error);
                });
        }
    }

    ngOnDestroy() {
        if (this.laborStore) {
            this.laborStore.unsubscribe();
        }
        if (this.topListStore) {
            this.topListStore.unsubscribe();
        }
    }

    getAllLabors(data) {
        this.store.dispatch({
            type: labor.actionTypes.APP_GETALL_LABOR, payload: {
                data: data
            }
        });
    }

    showLaborDetail(labor) {
        this.dataService.setData('userId', labor.id);
        this.router.navigate(['pages/settings/userprofile']);
        /* let dialogRef = this.dialog.open(UserDetailDialog);
        dialogRef.componentInstance.userDetails = labor; */
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
                sortBy: 'DISTANCE',
                categoryId: this.categoryId,
                addressType: this.addressType,
                address: address
            };
            this.getAllLabors(dataToSend);
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
            sortBy: 'DISTANCE',
            categoryId: this.categoryId,
            addressType: this.addressType,
            address: address
        };
        this.getAllLabors(data);
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