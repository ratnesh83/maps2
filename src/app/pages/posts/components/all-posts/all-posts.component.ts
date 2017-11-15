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
        private cdRef: ChangeDetectorRef,
        private dataService: DataService
    ) {

        this.postStore = this.store
            .select('post')
            .subscribe((res: any) => {
                if (res && res.posts) {
                    this.posts = res.posts;
                }
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
            this.postStore.unsubscribe();
        }
    }

    getAllPosts() {
        this.store.dispatch({
            type: post.actionTypes.APP_GET_JOBS, payload: {
                type: 'ACTIVE'
            }
        });
    }
    

    showPostDetail(id) {
        this.dataService.setData('jobId', id);
        this.router.navigate(['pages/posts/postdetails']);
    }

    selectTab(event) {
        if (event.index == 0) {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'ACTIVE'
                }
            });
        } else if (event.index == 1) {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'IN_PROGRESS'
                }
            });
        } else if (event.index == 2) {
            this.store.dispatch({
                type: post.actionTypes.APP_GET_JOBS, payload: {
                    type: 'COMPLETED'
                }
            });
        }
    }

    showPhoneInfo() {
        this.showPhone = true;
    }

    showEmailInfo() {
        this.showEmail = true;
    }

}