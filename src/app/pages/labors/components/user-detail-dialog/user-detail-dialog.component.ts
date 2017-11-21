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
                        <md-card class="user-card-heading">
                            <md-card-header class="posts-card-header posts-card-heading">
                                <div md-card-avatar class="labors-header-image">
                                    <img mat-card-avatar [src]="userDetails.profilePicture">
                                </div>
                                <md-card-title style="font-weight: 600; color: #1b1b1b; margin-bottom: 10px">
                                    <h3>{{userDetails.employerName}}</h3>
                                </md-card-title>
                                <md-card-subtitle style="font-weight: 500; margin-bottom: 0px; font-size: small">{{userDetails.distance + ' mile away'}}</md-card-subtitle>
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
                            Email
                        </p>
                        <p class="md-card-content-posts-content">
                            {{userDetails.email}}
                        </p>
                        <p class="md-card-content-posts-label">
                            Phone Number
                        </p>
                        <p class="md-card-content-posts-content">
                            {{userDetails.phoneNumber}}
                        </p>
                        <p class="md-card-content-posts-label">
                            Address
                        </p>
                        <p class="md-card-content-posts-content">
                            {{ showAddress(userDetails?.actualAddress?.addressLine1, userDetails?.actualAddress?.city, userDetails?.actualAddress?.zipCode, userDetails?.actualAddress?.state,
                                userDetails?.actualAddress?.country)}}
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

    showAddress(address, city, zipCode, state, country): String {
        let returnAddress;
        if (address) {
            returnAddress = address;
            if (city && address.toString().toLowerCase().indexOf(city.toString().toLowerCase()) == -1) {
                returnAddress = returnAddress + ', ' + city;
            }
            if (zipCode && address.indexOf(zipCode) != -1) {
                returnAddress = returnAddress + ', ' + zipCode;
            }
            if (state && state.toString().toLowerCase() != city.toString().toLowerCase() && address.toString().toLowerCase().indexOf(state.toString().toLowerCase()) == -1) {
                returnAddress = returnAddress + ', ' + state;
            }
            if (country && address.toString().toLowerCase().indexOf(country.toString().toLowerCase()) == -1) {
                returnAddress = returnAddress + ', ' + country;
            }
        }
        return returnAddress;
    }

}



