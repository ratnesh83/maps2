import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator, CountryCodeValidator } from '../../../../../theme/validators';
import * as feedback from '../../state/feedback.actions';
import { MdPaginator } from '@angular/material';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import 'style-loader!./feeds.scss';

@Component({
    selector: 'feeds',
    templateUrl: 'feeds.html'
})
export class Feeds {
    @ViewChild('feedbackPaginator') private _paginator: MdPaginator;
    public feedbacks;
    public rating;
    public count;
    public pageIndex;
    public searchKey = '';
    public searchString: string;
    public searchFilter: boolean;
    public value: 'all';
    public filter;
    public page = 1;
    public limit;
    public role: string;
    public feedbackStore;
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    myOptionsSelected;
    length;
    pageSize = 5;
    pageSizeOptions = [5, 10, 25, 100, 500];
    constructor(private activeModal: NgbActiveModal, private store: Store<any>) {
        this.count = 1;
        this.length = 1;
        this.pageIndex = 0;
        this.rating = 4.6;
        this.myOptions = [];
        this.myOptionsSelected = [
            { id: 'pending', value: 'all' },
            { id: 'inprogress', value: 'all' },
            { id: 'hiring', value: 'all' }
        ];
    }
    ngOnInit() {
        this.onLoad();
    }
    ngOnDestroy() {
        if (this.feedbackStore) {
            // this.feedbackStore.unsubscribe();
        }
    }
    onLoad() {
        this.role = 'all';
        this.filter = this.myOptionsSelected;
        // this.getAllFeedbacks();
    };
    getAllFeedbacks() {
        this.store.dispatch({
            type: feedback.actionTypes.GET_FEEDBACKS, payload: {
                currentPage: this.page,
                limit: this.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        });
    };
    pageChange(page) {
        /* this.store.dispatch({
            type: feedback.actionTypes.GET_FEEDBACKS, payload: {
                feedback: (this.searchKey != '') ? this.searchKey : undefined,
                currentPage: page.pageIndex + 1,
                limit: page.pageSize,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        }); */
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
    SearchFeedback(name) {
        this.searchKey = name;
        if (name.length > 0) {
            this.searchFilter = true;
            this.page = 1;
            /* this.store.dispatch({
                type: feedback.actionTypes.SEARCH_FEEDBACKS,
                payload: {
                    feedback: name,
                    currentPage: 1,
                    limit: this.pageSize,
                    skip: 0,
                    role: this.role,
                    filter: this.filter
                }
            }); */
        } else if (name.length == 0) {
            this.page = 1;
            // this.getAllFeedbacks();
        }
    }
}