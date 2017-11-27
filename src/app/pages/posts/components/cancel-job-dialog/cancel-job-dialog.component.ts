import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as post from '../../state/post.actions';
import 'style-loader!./cancel-job-dialog.scss';

@Component({
    selector: 'cancel-job-dialog',
    template: `
            <md-dialog-content style="box-shadow: none; background-color: initial; min-width: initial; margin: initial">
                <div class="col-sm-12">
                    Are you sure you want to cancel the job?
                </div>
            </md-dialog-content>
            <md-dialog-actions>
                <div>
                    <button md-button md-dialog-close class="btn-success" (click)="cancelJob()">YES</button>
                    <button md-button [md-dialog-close]="true">NO</button>
                </div>
            </md-dialog-actions>
    `
})

export class CancelJobDialog {

    public jobId;

    constructor(public dialog: MdDialog,
        private store: Store<any>) { }

    cancelJob() {
        let data = {
            jobId: this.jobId,
        };
        this.store.dispatch({
            type: post.actionTypes.APP_CANCEL_POST, payload: data
        });
    }

}



