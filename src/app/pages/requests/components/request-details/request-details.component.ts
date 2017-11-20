import { Component, OnInit, ViewChild, ElementRef, Renderer, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as request from '../../state/request.actions';
import * as app from '../../../../state/app.actions';
import { DataService } from '../../../../services/data-service/data.service';
import { BaThemeSpinner } from '../../../../theme/services';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import { NguiMapComponent } from '@ngui/map';

import 'style-loader!./request-details.scss';

@Component({
    selector: 'request-details',
    templateUrl: 'request-details.html',
})

export class RequestDetails implements OnInit {

    public request;
    public labours;
    public showPhone: boolean = false;
    public showEmail: boolean = false;
    public requestStore;

    constructor(
        private store: Store<any>,
        private modalService: NgbModal,
        private router: Router,
        private toastrService: ToastrService,
        private dataService: DataService
    ) {

        this.requestStore = this.store
            .select('request')
            .subscribe((res: any) => {
                if (res) {
                    this.request = res.request;
                }
                if (res) {
                    this.labours = res.labours;
                    if (this.labours) {
                        for (let i = 0; i < this.labours.length; i++) {
                            this.labours[i].showPhone = false;
                            this.labours[i].showEmail = false;
                        }
                    }
                }
            });
    };

    ngOnInit() {
        this.getRequestDetails();
    }

    viewProfile(id) {
        // this.dataService.setData('userId', id);
        this.router.navigate(['/pages/settings']);
    }

    ngOnDestroy() {
        if (this.requestStore) {
            // this.requestStore.unsubscribe();
        }
        this.dataService.removeData('requestId');
    }

    getRequestDetails() {
        this.store.dispatch({
            type: request.actionTypes.APP_GET_REQUEST, payload: {
                requestId: this.dataService.getData('requestId')
            }
        });
        /* this.store.dispatch({
            type: request.actionTypes.APP_GET_LABORS, payload: {
                requestId: this.dataService.getData('requestId')
            }
        }); */
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