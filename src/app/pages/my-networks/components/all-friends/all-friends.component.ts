import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as friend from '../../state/my-network.actions';
import * as app from '../../../../state/app.actions';
import { MdPaginator } from '@angular/material';
import { BaThemeSpinner } from '../../../../theme/services';
import { DataService } from '../../../../services/data-service/data.service';
import { SendInviteDialog } from '../send-invite-dialog/send-invite-dialog.component';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';
import { error } from 'util';
import 'style-loader!./all-friends.scss';

@Component({
    selector: 'all-friends',
    templateUrl: 'all-friends.html',
})

export class AllFriendList implements OnInit {

    @ViewChild('friendListPaginator') private _paginator: MdPaginator;
    public friends;
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
    public friendListStore;
    public length;
    public data;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100, 500];

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private dataService: DataService,
        private dialog: MdDialog
    ) {
        this.length = 1;
        this.pageIndex = 0;
        this.friendListStore = this.store
            .select('network')
            .subscribe((res: any) => {
                if (res) {
                    this.friends = res.friends;
                    if (this.friends) {
                        for (let i = 0; i < this.friends.length; i++) {
                            this.friends[i].showPhone = false;
                            this.friends[i].showEmail = false;
                        }
                    }
                }
                /* if (res && res.friends && res.friends.jobs) {
                    this.friends = res.friends.jobs;
                    this.count = this.friends.length;
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
        this.getAllFriendLists();
    }

    ngOnDestroy() {
        if (this.friendListStore) {
            this.friendListStore.unsubscribe();
        }
    }

    getAllFriendLists() {
        this.showLoading = false;
        this.store.dispatch({
            type: friend.actionTypes.APP_GET_FRIENDS_LIST, payload: {}
        });
    }

    showFriendListDetail(id) {

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

    openProfile(id, type) {
        this.dataService.setData('userId', id);
        if (type == 'EMPLOYER') {
            this.router.navigate(['/pages/settings/employerprofile']);
        } else {
            this.router.navigate(['/pages/settings/userprofile']);
        }
    }

    openSendInvite() {
        let dialogRef = this.dialog.open(SendInviteDialog);
    }

    pageChange(page) {
        this.store.dispatch({
            type: friend.actionTypes.APP_GET_LABORS_LIST, payload: {
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
        if (this.friends[index]) {
            this.friends[index].showPhone = true;
        }
    }

    showEmailInfo(index) {
        if (this.friends[index]) {
            this.friends[index].showEmail = true;
        }
    }

}