import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data-service/data.service';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
import 'style-loader!./approval-dialog.scss';

@Component({
    selector: 'approval-dialog',
    template: `
        <md-dialog-content>
            <div class="forgot-block">
                <div class="forgot-block-inner">
                    <div style="width: 100%; text-align: center; margin-bottom: 25px">
                        <img class="image-approval" src="assets/img/mail-icon.png">
                    </div>
                    <div style="width: 100%; text-align: center">
                        <h2 class="title">
                            Admin Approval
                        </h2>
                    </div>
                </div>
                <div class="forgot-block-message">
                    <span style="color: #777777">
                        Your application is sent for Admin Approval. 
                        You will be notified once approved.
                    </span>
                </div>
                <div class="forgot-block-inner">
                    <div class="form-action-btn form-action-btns">
                        <div class="form-group row">
                            <div class="col-12 col-sm-12">
                                <button md-raised-button type="button" (click)="submit()" color="primary" class="btn btn-warning btn-block btn-login">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ApprovalDialog {

    public data;
    public userId;

    constructor(private dialog: MdDialog,
        private toastrService: ToastrService,
        private router: Router,
        private dataService: DataService) {
    }

    ngOnInit() {
        if (this.dataService.getUserRegisterationId()) {
            this.userId = this.dataService.getUserRegisterationId();
        }
    }

    submit() {
        this.router.navigate(['pages/home']);
        this.dialog.closeAll();
    }
}



