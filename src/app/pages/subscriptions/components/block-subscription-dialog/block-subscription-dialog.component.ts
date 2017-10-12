import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MdDialog } from '@angular/material';

import * as subscription from '../../state/subscription.actions';
import * as app from '../../../../state/app.actions';

@Component({
    selector: 'block-subscription-dialog',
    template: `
        <div md-dialog-title style="text-align: center" *ngIf="activeSubscription && activeSubscription.isDeleted == true">Unblock Subscription</div>
        <div md-dialog-title style="text-align: center" *ngIf="activeSubscription && activeSubscription.isDeleted == false">Block Subscription</div>
        <md-dialog-content *ngIf="activeSubscription && activeSubscription.isDeleted == true">Are you sure you want to unblock {{activeSubscription.subscriptionName}}?</md-dialog-content>
        <md-dialog-content *ngIf="activeSubscription && activeSubscription.isDeleted == false">Are you sure you want to block {{activeSubscription.subscriptionName}}?</md-dialog-content>
        <md-dialog-actions>
            <div>
                <button md-button [md-dialog-close]="true" class="btn-success" (click)="blockSubscription()" *ngIf="activeSubscription && activeSubscription.isDeleted == true">Unblock</button>
                <button md-button [md-dialog-close]="true" class="btn-danger" (click)="blockSubscription()" *ngIf="activeSubscription && activeSubscription.isDeleted == false">Block</button>
                <button md-button [md-dialog-close]="true">Cancel</button>
            </div>
        </md-dialog-actions>
    `
})

export class BlockSubscriptionDialog {

    public activeSubscription;

    constructor(private activeModal: MdDialog, private store: Store<any>) { 
        this.store
            .select('subscription')
            .subscribe((res: any) => {
                this.activeSubscription = (res.activeSubscription) ? res.activeSubscription : null;
            });
    }

    blockSubscription() {
        this.activeModal.closeAll();
        let blockId = {
            subscriptionId: this.activeSubscription._id,
            isDeleted: !this.activeSubscription.isDeleted,
            applicableFor: this.activeSubscription.applicableFor
        };
        this.store.dispatch({
            type: subscription.actionTypes.BLOCK_SUBSCRIPTION,
            payload: { blockId: blockId }
        });  
    }
}



