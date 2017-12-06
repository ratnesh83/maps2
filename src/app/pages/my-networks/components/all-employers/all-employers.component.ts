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
                    this.employers = null;
                    let employers = res.employers ? res.employers.employerList : null;
                    if (employers) {
                        this.employers = [];
                        for (let i = 0; i < employers.length; i++) {
                            this.employers.push(employers[i]);
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
        this.getAllEmployerLists();
    }

    ngOnDestroy() {
        if (this.employerListStore) {
            this.employerListStore.unsubscribe();
        }
    }

    getAllEmployerLists() {
        this.showLoading = false;
        this.store.dispatch({
            type: employer.actionTypes.APP_GET_EMPLOYERS_LIST, payload: {}
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

    openProfile(id) {
        this.dataService.setData('userId', id);
        this.router.navigate(['/pages/settings/employerprofile']);
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