import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import * as request from '../../state/request.actions';
import 'style-loader!./feedback-dialog.scss';

@Component({
    selector: 'feedback-dialog',
    template: `
        <md-dialog-content style="padding: 24px 24px; min-width: 40vw">
            <div *ngIf="userDetails" class="posts-section" style="margin-bottom: 8px">
                <h3 style="color: #1b1b1b">
                    {{ userDetails.category + ': ' + userDetails.subCategory }}
                </h3>
                <div md-card-avatar class="requests-header-image text-center" style="width: 100%; height: 60px; margin-bottom: 8px">
                    <img mat-card-avatar style="height: 60px; width: 60px" [src]="userDetails.picture">
                </div>
                <div class="feed-input-box text-center" style="color: rgba(0, 0, 0, 0.54); font-weight: 500">
                    <h4>
                        {{ userDetails.name }}
                    </h4>
                </div>
                <div class="feed-input-box text-center">
                    <rating class="feedback-stars" [(ngModel)]="rating" [max]="5" fullIcon="★" emptyIcon="☆" [readonly]="false"
                        [disabled]="false" [required]="false" [float]="true" [titles]="['1', '2', '3', '4', '5']">
                    </rating>
                </div>
                <div class="form-group feed-input-box">
                    <textarea class="form-control" [(ngModel)]="feedback" placeholder="Feedback"></textarea>
                </div>
                <div class="text-center">
                    <button md-raised-button color="primary" type="button" class="btn btn-block btn-submit col-12 col-sm-6" (click)="postFeedback()">
                        SUBMIT
                    </button>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class FeedbackDialog {

    public userDetails;
    public rating = 0;
    public feedback;

    constructor(public dialog: MdDialog,
        private store: Store<any>) { }

    postFeedback() {
        this.store.dispatch({
            type: request.actionTypes.APP_POST_FEEDBACK, payload: {
                jobId: this.userDetails.jobId,
                userId: this.userDetails.userId,
                to: this.userDetails.to,
                rating: this.rating,
                feedback: this.feedback
            }
        });
    }

}



