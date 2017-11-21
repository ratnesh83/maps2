import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as labor from '../../state/labor.actions';
import * as app from '../../../../state/app.actions';
import { MdPaginator } from '@angular/material';
import { BaThemeSpinner } from '../../../../theme/services';
import { DataService } from '../../../../services/data-service/data.service';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';
import 'style-loader!./all-labors.scss';
import { error } from 'util';

@Component({
    selector: 'all-labors',
    templateUrl: 'all-labors.html',
})

export class AllLaborList implements OnInit {

    @ViewChild('laborListPaginator') private _paginator: MdPaginator;
    public labors;
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
    public laborListStore;
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
        this.laborListStore = this.store
            .select('laborList')
            .subscribe((res: any) => {
                if (res) {
                    this.labors = res.labors;
                }
                /* if (res && res.labors && res.labors.jobs) {
                    this.labors = res.labors.jobs;
                    this.count = this.labors.length;
                    this.length = this.count;
                    this.limit = this.pageSize;
                    this.pageIndex = res.currentPage - 1;
                } */
            });

        if (navigator.geolocation) {
            this.showLoading = true;
            this.locationStatus = 'Fetching current location...';
            let self = this;
            navigator.geolocation.getCurrentPosition((response) => {
                self.showPosition(response, self);
                self.showLoading = false;
            }, (error) => {
                self.showLoading = true;
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

    showPosition(position, self) {
        if (position && position.coords) {
            let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        let addressComponents = results[0].address_components;
                        let latitude = results[0].geometry.location.lat();
                        let longitude = results[0].geometry.location.lng();
                        let data = {
                            latitude: latitude,
                            longitude: longitude,
                            sortBy: 'DISTANCE'
                        };
                        self.data = data;
                        self.getAllLaborListsCallback(data, self);
                    }
                }
            });
        }
    }

    ngOnInit() {
        // this.getAllLaborListsCallback();
    }

    ngOnDestroy() {
        if (this.laborListStore) {
            // this.laborListStore.unsubscribe();
        }
    }

    getAllLaborListsCallback(data, self) {
        self.showLoading = false;
        self.store.dispatch({
            type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
                data: data
            }
        });
    }

    showLaborListDetail(id) {

    }

    pageChange(page) {
        this.store.dispatch({
            type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
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

    showPhoneInfo() {
        this.showPhone = true;
    }

    showEmailInfo() {
        this.showEmail = true;
    }

}