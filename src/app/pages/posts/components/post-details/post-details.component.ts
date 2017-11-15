import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as post from '../../state/post.actions';
import * as app from '../../../../state/app.actions';
import { DataService } from '../../../../services/data-service/data.service';
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

    public post;
    public labours;
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

                if (res && res.post) {
                    this.post = res.post;
                }
                if (res && res.labours) {
                    this.labours = res.labours;
                    for (let i = 0; i < this.labours.length; i++) {
                        this.labours[i].showPhone = false;
                        this.labours[i].showEmail = false;
                    }
                }
            });
    };

    ngOnInit() {
        this.getPostDetails();
    }

    viewProfile(id) {
        // this.dataService.setData('userId', id);
        this.router.navigate(['/pages/settings']);
    }

    ngOnDestroy() {
        if (this.postStore) {
            this.postStore.unsubscribe();
        }
        this.dataService.removeData('jobId');
    }

    getPostDetails() {
        this.store.dispatch({
            type: post.actionTypes.APP_GET_JOB, payload: {
                jobId: this.dataService.getData('jobId')
            }
        });
        this.store.dispatch({
            type: post.actionTypes.APP_GET_LABORS, payload: {
                jobId: this.dataService.getData('jobId')
            }
        });
    };

    showPhoneInfo(id) {
        if (this.labours && this.labours[id]) {
            this.labours[id].showPhone = true;
        }
    }

    showEmailInfo(id) {
        if (this.labours && this.labours[id]) {
            this.labours[id].showEmail = true;
        }
    }

}