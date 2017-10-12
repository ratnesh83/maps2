import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdDialog } from '@angular/material';

import * as employer from '../../state/user.actions';
import * as worker from '../../state/user.actions';

@Component({
    selector: 'confirm-modal',
    template: `
        <md-dialog-content>
            <div class="col-sm-12">
                {{message}}
            </div>
            <md-input-container *ngIf="rejectAction == true && singleDocAction == false" class="col-sm-12">
                <input [(ngModel)]="rejectionMessage" mdInput type="text" placeholder="Reason">
            </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
            <div>
                <button *ngIf="rejectAction == true && singleDocAction == false" md-button md-dialog-close class="btn-danger" (click)="rejectUser()">Reject</button>
                <button *ngIf="rejectAction == false && singleDocAction == false" md-button md-dialog-close class="btn-success" (click)="approveUser()">Approve</button>
                <button *ngIf="rejectAction == true && singleDocAction == true" md-button md-dialog-close class="btn-danger" (click)="rejectDocument()">Reject</button>
                <button *ngIf="rejectAction == false && singleDocAction == true" md-button md-dialog-close class="btn-success" (click)="approveDocument()">Approve</button>
                <button md-button [md-dialog-close]="true">Cancel</button>
            </div>
        </md-dialog-actions>
    `
})

export class ConfirmModal {

    userType;
    singleDocAction: boolean;
    rejectAction: boolean;
    userId;
    employerId;
    organisationId;
    message;
    document;
    rejectionMessage;

    constructor(public dialog: MdDialog, private store: Store<any>) {
        this.store
            .select('employer')
            .subscribe((res: any) => {
            });
    }

    rejectUser() {
        this.dialog.closeAll();
        if (this.userType == 'employer') {
            this.store.dispatch({
                type: employer.actionTypes.REJECT_EMPLOYER,
                payload: {
                    _id: this.userId,
                    rejectionReason: this.rejectionMessage
                }
            });
        } else if (this.userType == 'worker') {
            this.store.dispatch({
                type: worker.actionTypes.REJECT_WORKER,
                payload: {
                    _id: this.userId,
                    rejectionReason: this.rejectionMessage
                }
            });
        }
    }

    approveUser() {
        this.dialog.closeAll();
        if (this.userType == 'employer') {
            this.store.dispatch({
                type: employer.actionTypes.APPROVE_EMPLOYER,
                payload: { _id: this.userId }
            });
        } else if (this.userType == 'worker') {
            this.store.dispatch({
                type: worker.actionTypes.APPROVE_WORKER,
                payload: { _id: this.userId }
            });
        }
    }

    rejectDocument() {
        this.dialog.closeAll();
        if (this.userType == 'employer') {
            this.store.dispatch({
                type: employer.actionTypes.CHANGE_EMPLOYER_DOCUMENT_APPROVAL,
                payload: {
                    data: this.document,
                    rejection: true
                }
            });
        } else if (this.userType == 'worker') {
            this.store.dispatch({
                type: worker.actionTypes.CHANGE_WORKER_DOCUMENT_APPROVAL,
                payload: {
                    data: this.document,
                    rejection: true
                }
            });
        } 
    }

    approveDocument() {
        this.dialog.closeAll();
        if (this.userType == 'employer') {
            this.store.dispatch({
                type: employer.actionTypes.CHANGE_EMPLOYER_DOCUMENT_APPROVAL,
                payload: {
                    data: this.document,
                    rejection: false
                }
            });
        } else if (this.userType == 'worker') {
            this.store.dispatch({
                type: worker.actionTypes.CHANGE_WORKER_DOCUMENT_APPROVAL,
                payload: {
                    data: this.document,
                    rejection: false
                }
            });
        }
    }
}



