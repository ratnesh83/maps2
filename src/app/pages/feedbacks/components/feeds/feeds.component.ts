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
    public filter;
    public page = 1;
    public limit;
    public feedbackStore;
    public length;
    public pageSize = 5;
    public pageSizeOptions = [5, 10, 25, 100, 500];

    constructor(private activeModal: NgbActiveModal, private store: Store<any>) {
        this.length = 1;
        this.pageIndex = 0;
        this.feedbackStore = this.store
            .select('feedback')
            .subscribe((res: any) => {
                if (res) {
                    this.feedbacks = res.feedbacks;
                }
            });
    }

    ngOnInit() {
        this.getAllFeedbacks();
    }

    ngOnDestroy() {
        if (this.feedbackStore) {
            // this.feedbackStore.unsubscribe();
        }
    }

    getAllFeedbacks() {
        this.store.dispatch({
            type: feedback.actionTypes.GET_FEEDBACKS, payload: {
                currentPage: this.page,
                limit: this.pageSize
            }
        });
    }

    pageChange(page) {
        /* this.store.dispatch({
            type: feedback.actionTypes.GET_FEEDBACKS, payload: {
                currentPage: page.pageIndex + 1,
                limit: page.pageSize
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

}