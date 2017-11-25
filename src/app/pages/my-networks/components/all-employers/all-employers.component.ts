import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as employer from '../../state/my-network.actions';
import * as app from '../../../../state/app.actions';
import { MdPaginator } from '@angular/material';
import { BaThemeSpinner } from '../../../../theme/services';
import { DataService } from '../../../../services/data-service/data.service';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';
import 'style-loader!./all-employers.scss';
import { error } from 'util';

@Component({
    selector: 'all-employers',
    templateUrl: 'all-employers.html',
})

export class AllEmployerList implements OnInit {

    @ViewChild('employerListPaginator') private _paginator: MdPaginator;
    public employers;
    public page = 1;
    public tabIndex = 0;
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
    public locationStatus;
    public employerListStore;
    public length;
    public data;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100, 500];

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private dataService: DataService
    ) {
        this.length = 1;
        this.pageIndex = 0;
        this.employerListStore = this.store
            .select('network')
            .subscribe((res: any) => {
                if (res) {
                    this.employers = res.employers;
                    if (this.employers) {
                        for (let i = 0; i < this.employers.length; i++) {
                            this.employers[i].showPhone = false;
                            this.employers[i].showEmail = false;
                        }
                    }
                }
                /* if (res && res.employers && res.employers.jobs) {
                    this.employers = res.employers.jobs;
                    this.count = this.employers.length;
                    this.length = this.count;
                    this.limit = this.pageSize;
                    this.pageIndex = res.currentPage - 1;
                } */
            });

        if (navigator.geolocation) {
            this.showLoading = true;
            this.locationStatus = 'Fetching current location...';
            navigator.geolocation.getCurrentPosition((response) => {
                if (response && response.coords) {
                    let latlng = new google.maps.LatLng(response.coords.latitude, response.coords.longitude);
                    let geocoder = new google.maps.Geocoder();
                    let data = {
                        latitude: response.coords.latitude,
                        longitude: response.coords.longitude,
                        sortBy: 'DISTANCE'
                    };
                    this.data = data;
                    this.showLoading = false;
                    this.getAllEmployerLists(data);
                    this.geocoder(geocoder, latlng)
                        .then((result) => {
                            let results = result;
                            if (results[0]) {
                                // let addressComponents = results[0].address_components;
                                // let latitude = results[0].geometry.location.lat();
                                // let longitude = results[0].geometry.location.lng();
                                // let data = {
                                //     latitude: latitude,
                                //     longitude: longitude,
                                //     sortBy: 'DISTANCE'
                                // };
                                // this.data = data;
                                // this.showLoading = false;
                                // this.getAllEmployerListsCallback(data);
                            }
                        })
                        .catch((error: any) => {
                            // console.error(error);
                        });
                }
            }, (error) => {
                this.showLoading = true;
                this.locationStatus = 'Error .';
                switch (error.code) {
                    case 1:
                        this.locationStatus = 'Location permission denied.';
                        break;
                    case 2:
                        this.locationStatus = 'Position unavailable.';
                        break;
                    case 3:
                        this.locationStatus = 'Fetching current location timed out.';
                        break;
                    default:
                        break;
                }
            });
        } else {
            this.locationStatus = 'Geolocation is not supported by this browser.';
            this.showLoading = true;
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

    ngOnInit() {
        // this.getAllEmployerListsCallback();
    }

    ngOnDestroy() {
        if (this.employerListStore) {
            this.employerListStore.unsubscribe();
        }
    }

    getAllEmployerLists(data) {
        this.showLoading = false;
        this.store.dispatch({
            type: employer.actionTypes.APP_GET_LABORS_LIST, payload: {
                data: data
            }
        });
    }

    showEmployerListDetail(id) {

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

    pageChange(page) {
        this.store.dispatch({
            type: employer.actionTypes.APP_GET_LABORS_LIST, payload: {
                data: this.data
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

    showPhoneInfo(index) {
        if (this.employers[index]) {
            this.employers[index].showPhone = true;
        }
    }

    showEmailInfo(index) {
        if (this.employers[index]) {
            this.employers[index].showEmail = true;
        }
    }

}