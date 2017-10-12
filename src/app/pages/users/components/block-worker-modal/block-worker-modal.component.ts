import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdDialog } from '@angular/material';

import * as worker from '../../state/user.actions';
import * as app from '../../../../state/app.actions';

@Component({
    selector: 'block-worker-modal',
    template: `
        <div style="text-align: center" md-dialog-title *ngIf="activeWorker && activeWorker.isBlocked == true">Unblock Worker</div>
        <div style="text-align: center" md-dialog-title *ngIf="activeWorker && activeWorker.isBlocked == false">Block Worker</div>
        <md-dialog-content *ngIf="activeWorker && activeWorker.isBlocked == true">Are you sure you want to unblock {{activeWorker.name}}?</md-dialog-content>
        <md-dialog-content *ngIf="activeWorker && activeWorker.isBlocked == false">Are you sure you want to block {{activeWorker.name}}?</md-dialog-content>
        <md-dialog-actions>
            <div>
                <button md-button [md-dialog-close]="true" (click)="blockWorker()" class="btn-success" *ngIf="activeWorker && activeWorker.isBlocked == true">Unblock</button>
                <button md-button [md-dialog-close]="true" class="btn-danger" (click)="blockWorker()" *ngIf="activeWorker && activeWorker.isBlocked == false">Block</button>
                <button md-button [md-dialog-close]="true">Cancel</button>
            </div>
        </md-dialog-actions>
    `
})

export class BlockWorkerModal {

    public activeWorker;

    constructor(private activeModal: MdDialog, private store: Store<any>) {
        this.store
            .select('worker')
            .subscribe((res: any) => {
                this.activeWorker = (res.activeWorker) ? res.activeWorker : null;
            });
    }

    blockWorker() {
        this.activeModal.closeAll();
        let blockId = {
            _id: this.activeWorker._id,
            isBlocked: !this.activeWorker.isBlocked
        };
        this.store.dispatch({
            type: worker.actionTypes.BLOCK_THIS_WORKER,
            payload: { blockId: blockId, role: 'worker' }
        });
    }
}



