import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as notification from '../notification/state/notification.actions';
import 'style-loader!./confirm-invitation-dialog.scss';

@Component({
    selector: 'confirm-invitation-dialog',
    template: `
            <md-dialog-content style="box-shadow: none; background-color: initial; min-width: initial; margin: initial">
                <div class="col-sm-12">
                    Are you sure you want to accept the invitation?
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <div>
                    <button md-button md-dialog-close style="background-color: #026eff; color: white" class="btn-success btn-submit-diag" (click)="acceptInvitation()">YES</button>
                    <button md-button style="background-color: #026eff; color: white" class="btn-submit-diag" [md-dialog-close]="true">NO</button>
                </div>
            </md-dialog-actions>
    `
})

export class ConfirmInvitationDialog {

    public id;

    constructor(public dialog: MdDialog,
        private store: Store<any>) { }

    acceptInvitation() {
        let data = {
            userId: this.id,
        };
        this.store.dispatch({
            type: notification.actionTypes.ACCEPT_INVITATION, payload: data
        });
    }

}



