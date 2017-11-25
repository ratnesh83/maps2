import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as post from '../../state/post.actions';
import * as app from '../../../../state/app.actions';
import { MdPaginator } from '@angular/material';
import { BaThemeSpinner } from '../../../../theme/services';
import { DataService } from '../../../../services/data-service/data.service';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';
import 'style-loader!./all-posts.scss';

@Component({
    selector: 'all-posts',
    templateUrl: 'all-posts.html',
})

export class AllPosts implements OnInit {

    @ViewChild('postsPaginator') private _paginator: MdPaginator;
    public posts;
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
    public postStore;
    public length;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100, 500];

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private cdRef: ChangeDetectorRef,
        private dataService: DataService
    ) {
        this.length = 1;
        this.pageIndex = 0;
        this.postStore = this.store
            .select('post')
            .subscribe((res: any) => {
                if (res) {
                    this.posts = res.posts;
                }
                /* if (res && res.posts && res.posts.jobs) {
                    this.posts = res.posts.jobs;
                    this.count = this.posts.length;
                    this.length = this.count;
                    this.limit = this.pageSize;
                    this.pageIndex = res.currentPage - 1;
                } */
            });
    };

    ngOnInit() {
        this.getAllPosts();
    }

    addPost() {
        this.router.navigate(['/pages/posts/postjob']);
    }

    ngOnDestroy() {
        if (this.postStore) {
            // this.postStore.unsubscribe();
        }
    }

    getAllPosts() {
        this.store.dispatch({
            type: post.actionTypes.APP_GET_JOBS, payload: {
                type: 'ACTIVE',
                currentPage: this.page,
                limit: this.pageSize
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

    showPostDetail(id) {
        this.dataService.setData('jobId', id);
        this.router.navigate(['pages/posts/postdetails']);
    }

    editPost(id) {
        this.dataService.setData('jobId', id);
        this.router.navigate(['pages/posts/editpost']);
    }

    selectTab(event) {
        if (event.index == 0) {
            this.tabIndex = 0;
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'ACTIVE',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        } else if (event.index == 1) {
            this.tabIndex = 1;
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'IN_PROGRESS',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        } else if (event.index == 2) {
            this.tabIndex = 2;
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'COMPLETED',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        }
    }

    pageChange(page) {
        if (this.tabIndex == 0) {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'ACTIVE',
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                }
            });
        } else if (this.tabIndex == 1) {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'IN_PROGRESS',
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                }
            });
        } else if (this.tabIndex == 2) {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
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

}