import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';

import 'style-loader!./user-detail-dialog.scss';

@Component({
    selector: 'user-detail-dialog',
    template: `
        <md-dialog-content style="padding: 24px 24px; min-width: 40vw">
            <div *ngIf="userDetails" class="panel-heading">
                <div class="row">
                    <div class="col-12 col-sm-12 user-feed-heading">
                        <md-card class="posts-card-heading">
                            <md-card-header class="posts-card-header posts-card-heading">
                                <md-card-title style="font-weight: 600; color: #1b1b1b">
                                    <h3>{{userDetails.title}}</h3>
                                </md-card-title>
                                <md-card-subtitle style="font-weight: 500; margin-bottom: 0px; font-size: small">{{userDetails.category ? userDetails.category + ': ' + userDetails.subCategory : userDetails.category}}</md-card-subtitle>
                                <div class="posts-header-right">
                                    <div style="margin-bottom: 0.5rem; color: #026eff; font-weight: 600">
                                        <h4>{{'$' + userDetails.rate + '/' + (userDetails.rateType == 'DAILY' ? 'day' : userDetails.rateType == 'WEEKLY' ?
                                            'week' : userDetails.rateType == 'MONTHLY' ? 'month' : 'hr')}}</h4>
                                    </div>
                                    <div style="color: #1c9f7f; font-weight: 500; font-size: small">
                                        {{userDetails.userStatus == 'IN_PROGRESS' ? 'IN PROGRESS' : userDetails.userStatus}}
                                    </div>
                                </div>
                            </md-card-header>
                            <md-card-content>

                            </md-card-content>
                        </md-card>
                    </div>
                </div>
            </div>
            <div *ngIf="userDetails" class="posts-section">
                <md-card class="posts-card-dialog">
                    <md-card-content>
                        <p class="md-card-content-posts-label">
                            User Location
                        </p>
                        <p class="md-card-content-posts-content">
                            {{userDetails.employerAddress ? userDetails.employerAddress.addressLine1 : ''}}
                        </p>
                        <p class="md-card-content-posts-label">
                            User Date
                        </p>
                        <p class="md-card-content-posts-content">
                            {{userDetails.startDate | date : 'dd/MM/yyyy'}} - {{userDetails.endDate | date : 'dd/MM/yyyy'}}
                        </p>
                        <p class="md-card-content-posts-label">
                            User Details
                        </p>
                        <p class="md-card-content-posts-content">
                            {{userDetails.userDetails}}
                        </p>
                        <p class="md-card-content-posts-label">
                            No. of Labors Required
                        </p>
                        <p class="md-card-content-posts-content">
                            {{userDetails.requiredLabourers}}
                        </p>
                    </md-card-content>
                </md-card>

            </div>
        </md-dialog-content>
    `
})

export class UserDetailDialog {
    
    public userDetails;
    
    constructor(public dialog: MdDialog) { }
}



