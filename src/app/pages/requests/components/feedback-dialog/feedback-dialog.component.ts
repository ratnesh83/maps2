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
                    {{ userDetails.title }}
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
                    <rating class="feed-stars" [(ngModel)]="rating" [max]="5" fullIcon="★" emptyIcon="☆" [readonly]="false"
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
        let data = {
            jobId: this.userDetails.jobId,
            userId: this.userDetails.userId,
            to: this.userDetails.to,
            rating: this.rating,
            feedback: this.feedback
        };
        if(!data.feedback || data.feedback == '' || data.feedback == null || data.feedback === undefined) {
            delete data.feedback;
        }
        let formData = new FormData();
        formData.append('userId', this.userDetails.userId);
        formData.append('to', this.userDetails.to);
        formData.append('rating', this.rating ? this.rating.toString() : '0');
        if (this.feedback || this.feedback != '' || this.feedback != null || this.feedback != undefined) {
            formData.append('feedback', this.feedback);
        }
        this.store.dispatch({
            type: request.actionTypes.APP_POST_FEEDBACK, payload: { 
                form: formData,
                jobId: this.userDetails.jobId
            }
        });
    }

}



