import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as post from '../../state/post.actions';
import * as app from '../../../../state/app.actions';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';

import 'style-loader!./post-details.scss';

@Component({
    selector: 'post-details',
    templateUrl: 'post-details.html',
})

export class PostDetails implements OnInit {

    public posts;
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
    public postStore;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private cdRef: ChangeDetectorRef
    ) {

        this.postStore = this.store
            .select('post')
            .subscribe((res: any) => {
                if (res) {
                    this.count = res.count;
                    this.posts = [];
                    if (res.posts) {

                    }
                }
            });
    };

    ngOnInit() {
        this.getPostDetails();
    }

    addPost() {
        this.router.navigate(['/pages/posts/postjob']);
    }

    ngOnDestroy() {
        if (this.postStore) {
            this.postStore.unsubscribe();
        }
    }

    getPostDetails() {
        /* this.store.dispatch({
            type: post.actionTypes.APP_GETALL_JOB, payload: {
                currentPage: this.page,
                limit: 10,
                role: this.role,
                filter: this.filter,
                value: this.value
            }
        }); */
    };

}