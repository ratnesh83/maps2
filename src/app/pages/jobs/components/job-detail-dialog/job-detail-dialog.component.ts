import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';

import 'style-loader!./job-detail-dialog.scss';

@Component({
    selector: 'job-detail-dialog',
    template: `
        <md-dialog-content style="padding: 24px 24px; min-width: 40vw">
            <div *ngIf="jobDetails" class="panel-heading">
                <div class="row">
                    <div class="col-12 col-sm-12 user-feed-heading">
                        <md-card class="posts-card-heading">
                            <md-card-header class="posts-card-header posts-card-heading">
                                <md-card-title style="font-weight: 600; color: #1b1b1b">
                                    <h3>{{jobDetails.title}}</h3>
                                </md-card-title>
                                <md-card-subtitle style="font-weight: 500; margin-bottom: 0px; font-size: small">{{jobDetails.category ? jobDetails.category + ': ' + jobDetails.subCategory : jobDetails.category}}</md-card-subtitle>
                                <div class="posts-header-right">
                                    <div style="margin-bottom: 0.5rem; color: #026eff; font-weight: 600">
                                        <h4>{{'$' + jobDetails.rate + '/' + (jobDetails.rateType == 'DAILY' ? 'day' : jobDetails.rateType == 'WEEKLY' ?
                                            'week' : jobDetails.rateType == 'MONTHLY' ? 'month' : 'hr')}}</h4>
                                    </div>
                                    <div style="color: #1c9f7f; font-weight: 500; font-size: small">
                                        {{jobDetails.jobStatus == 'IN_PROGRESS' ? 'IN PROGRESS' : jobDetails.jobStatus}}
                                    </div>
                                </div>
                            </md-card-header>
                            <md-card-content>

                            </md-card-content>
                        </md-card>
                    </div>
                </div>
            </div>
            <div *ngIf="jobDetails" class="posts-section">
                <md-card class="posts-card-dialog">
                    <md-card-content>
                        <p class="md-card-content-posts-label">
                            Job Location
                        </p>
                        <p class="md-card-content-posts-content">
                            {{jobDetails.employerAddress ? jobDetails.employerAddress.addressLine1 : ''}}
                        </p>
                        <p class="md-card-content-posts-label">
                            Job Date
                        </p>
                        <p class="md-card-content-posts-content">
                            {{jobDetails.startDate | date : 'dd/mm/yyyy'}} - {{jobDetails.endDate | date : 'dd/mm/yyyy'}}
                        </p>
                        <p class="md-card-content-posts-label">
                            Job Details
                        </p>
                        <p class="md-card-content-posts-content">
                            {{jobDetails.jobDetails}}
                        </p>
                        <p class="md-card-content-posts-label">
                            No. of Labors Required
                        </p>
                        <p class="md-card-content-posts-content">
                            {{jobDetails.requiredLabourers}}
                        </p>
                    </md-card-content>
                </md-card>

            </div>
        </md-dialog-content>
    `
})

export class JobDetailDialog {
    
    public jobDetails;
    
    constructor(public dialog: MdDialog) { }
}



