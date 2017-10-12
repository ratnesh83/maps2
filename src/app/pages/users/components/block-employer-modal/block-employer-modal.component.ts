import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdDialog } from '@angular/material';

import * as employer from '../../state/user.actions';
import * as app from '../../../../state/app.actions';

@Component({
    selector: 'block-employer-modal',
    template: `
        <div style="text-align: center" md-dialog-title *ngIf="activeEmployer && activeEmployer.isBlocked == true">Unblock Employer</div>
        <div style="text-align: center" md-dialog-title *ngIf="activeEmployer && activeEmployer.isBlocked == false">Block Employer</div>
        <md-dialog-content *ngIf="activeEmployer && activeEmployer.isBlocked == true">Are you sure you want to unblock {{activeEmployer.name}}?</md-dialog-content>
        <md-dialog-content *ngIf="activeEmployer && activeEmployer.isBlocked == false">Are you sure you want to block {{activeEmployer.name}}?</md-dialog-content>
        <md-dialog-actions>
            <div>
                <button md-button [md-dialog-close]="true" (click)="blockEmployer()" class="btn-success" *ngIf="activeEmployer && activeEmployer.isBlocked == true">Unblock</button>
                <button md-button [md-dialog-close]="true" class="btn-danger" (click)="blockEmployer()" *ngIf="activeEmployer && activeEmployer.isBlocked == false">Block</button>
                <button md-button [md-dialog-close]="true">Cancel</button>
            </div>
        </md-dialog-actions>
    `
})

export class BlockEmployerModal {

    public activeEmployer;

    constructor(private activeModal: MdDialog, private store: Store<any>) { 
        this.store
            .select('employer')
            .subscribe((res: any) => {
                this.activeEmployer = (res.activeEmployer) ? res.activeEmployer : null;
            });
    }

    blockEmployer() {
        this.activeModal.closeAll();
        let blockId = {
            _id: this.activeEmployer._id,
            isBlocked: !this.activeEmployer.isBlocked
        };
        this.store.dispatch({
            type: employer.actionTypes.BLOCK_THIS_EMPLOYER,
            payload: { blockId: blockId, role: 'employer'}
        }); 
    }
}



