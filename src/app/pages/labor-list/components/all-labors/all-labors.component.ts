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
    public laborListStore;
    public length;
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
    };

    ngOnInit() {
        this.getAllLaborLists();
    }

    ngOnDestroy() {
        if (this.laborListStore) {
            // this.laborListStore.unsubscribe();
        }
    }

    getAllLaborLists() {
        this.store.dispatch({
            type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
                type: 'ACTIVE',
                currentPage: this.page,
                    limit: this.pageSize
            }
        });
    }
    

    showLaborListDetail(id) {
        // this.dataService.setData('jobId', id);
        // this.router.navigate(['pages/labors/laborListdetails']);
    }

    selectTab(event) {
        if (event.index == 0) {
            this.tabIndex = 0;
            this.store.dispatch({
                type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
                    type: 'ACTIVE',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        } else if (event.index == 1) {
            this.tabIndex = 1;
            this.store.dispatch({
                type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
                    type: 'IN_PROGRESS',
                    currentPage: this.page,
                    limit: this.pageSize
                }
            });
        } else if (event.index == 2) {
            this.tabIndex = 2;
            this.store.dispatch({
                type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
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
                type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
                    type: 'ACTIVE',
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                }
            });
        } else if (this.tabIndex == 1) {
            this.store.dispatch({
                type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
                    type: 'IN_PROGRESS',
                    currentPage: page.pageIndex + 1,
                    limit: page.pageSize,
                }
            });
        } else if (this.tabIndex== 2) {
            this.store.dispatch({
                type: labor.actionTypes.APP_GET_LABORS_LIST, payload: {
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