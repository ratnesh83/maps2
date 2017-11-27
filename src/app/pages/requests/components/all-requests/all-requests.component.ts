import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';
import * as request from '../../state/request.actions';
import * as app from '../../../../state/app.actions';
import * as auth from '../../../../auth/state/auth.actions';
import { MdPaginator } from '@angular/material';
import { BaThemeSpinner } from '../../../../theme/services';
import { DataService } from '../../../../services/data-service/data.service';
import { FeedbackDialog } from '../feedback-dialog/feedback-dialog.component';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';
import 'style-loader!./all-requests.scss';

@Component({
    selector: 'all-requests',
    templateUrl: 'all-requests.html',
})

export class AllRequests implements OnInit {

    @ViewChild('requestsPaginator') private _paginator: MdPaginator;
    public requests;
    public page = 1;
    public tabIndex = 0;
    public limit;
    public pageIndex;
    public count: number;
    public name: string;
    public role: string;
    public value: 'all';
    public jwtHelper: JwtHelper = new JwtHelper();
    public user;
    public filter;
    public showPhone: boolean = false;
    public showEmail: boolean = false;
    public requestStore;
    public rating;
    public length;
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
        this.requestStore = this.store
            .select('request')
            .subscribe((res: any) => {
                if (res) {
                    this.requests = res.requests;
                    if (res.postFeedback) {
                        this.dialog.closeAll();
                    }
                }
                /* if (res && res.requests && res.requests.jobs) {
                    this.requests = res.requests.jobs;
                    this.count = this.requests.length;
                    this.length = this.count;
                    this.limit = this.pageSize;
                    this.pageIndex = res.currentPage - 1;
                } */
            });
    };

    ngOnInit() {
        this.getAllRequests();
        let token = localStorage.getItem('tokenSession');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.user = this.jwtHelper.decodeToken(token);
        }
    }

    ngOnDestroy() {
        if (this.requestStore) {
            this.requestStore.unsubscribe();
        }
    }

    getAllRequests() {
        this.store.dispatch({
            type: request.actionTypes.APP_GET_REQUESTS, payload: {
                type: 'ACCEPTED_BY_LABOUR',
                currentPage: this.page,
                limit: this.pageSize
            }
        });
    }


    showRequestDetail(id) {
        this.dataService.setData('requestId', id);
        this.router.navigate(['pages/requests/requestdetails']);
    }

    selectTab(event) {
        if (event.index == 0) {
            this.tabIndex = 0;
            this.store.dispatch({
                type: request.actionTypes.APP_GET_REQUESTS, payload: {
                    type: 'ACCEPTED_BY_LABOUR',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        } else if (event.index == 1) {
            this.tabIndex = 1;
            this.store.dispatch({
                type: request.actionTypes.APP_GET_REQUESTS, payload: {
                    type: 'CONFIRMED_BY_EMPLOYER',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        } else if (event.index == 2) {
            this.tabIndex = 2;
            this.store.dispatch({
                type: request.actionTypes.APP_GET_REQUESTS, payload: {
                    type: 'COMPLETED',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        }
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
        if (this.tabIndex == 0) {
            this.store.dispatch({
                type: request.actionTypes.APP_GET_REQUESTS, payload: {
                    type: 'ACCEPTED_BY_LABOUR',
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                }
            });
        } else if (this.tabIndex == 1) {
            this.store.dispatch({
                type: request.actionTypes.APP_GET_REQUESTS, payload: {
                    type: 'CONFIRMED_BY_EMPLOYER',
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                }
            });
        } else if (this.tabIndex == 2) {
            this.store.dispatch({
                type: request.actionTypes.APP_GET_REQUESTS, payload: {
                    type: 'COMPLETED',
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                }
            });
        }
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

    openFeedbackDialog(data) {
        // to: data.employerId ? data.employerId.userType == 'USER' ? 'EMPLOYER' : 'LABOUR' : '',        
        let payload = {
            jobId: data.jobId ? data.jobId._id : '',
            userId: data.employerId ? data.employerId._id : '',
            title: data.jobId ? data.jobId.title : '',
            name: data.employerId ? data.employerId.fullName ? data.employerId.fullName : data.employerId.firstName + ' ' + data.employerId.lastName : '',
            picture: data.employerId ? data.employerId.profilePicture.thumb ? data.employerId.profilePicture.thumb : 'assets/img/user.png' : 'assets/img/user.png',
            category: data.jobId ? data.jobId.category : '',
            subCategory: data.jobId ? data.jobId.subCategory : '',
            to: 'EMPLOYER'
        };
        let dialogRef = this.dialog.open(FeedbackDialog);
        dialogRef.componentInstance.userDetails = payload;
    }

}