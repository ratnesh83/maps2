import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import 'style-loader!./change-email-dialog.scss';

@Component({
    selector: 'change-email-dialog',
    template: `
        <md-dialog-content>
            <div class="forgot-block">
                <div class="forgot-block-inner">
                    <div style="width: 100%; text-align: center; margin-bottom: 25px">
                        <img class="image" src="assets/img/lock2.png">
                    </div>
                    <div style="width: 100%; text-align: center">
                        <h2 class="title">
                            Forgot Password?
                        </h2>
                    </div>
                </div>
                <div class="forgot-block-message">
                    <span style="color: #777777">
                        Please enter your registered phone number / email id so that we can help you out with resetting your password.
                    </span>
                </div>
                <div class="forgot-block-inner">
                    <div style="text-align: center">
                        <input type="text" class="form-control" id="inputUser" placeholder="Phone Number / Email">
                    </div>
                    <div class="form-action-btn form-action-btns">
                        <div class="form-group row">
                            <div class="col-12 col-sm-12">
                                <button md-raised-button type="button" color="primary" class="btn btn-warning btn-block btn-login">RESET PASSWORD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ChangeEmailDialog {
    data;
    constructor(public dialog: MdDialog) {

    }
}



