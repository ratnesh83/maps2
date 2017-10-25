import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import 'style-loader!./forgot-password-dialog.scss';

@Component({
    selector: 'forgot-password-dialog',
    template: `
        <md-dialog-content>
            <div class="forgot-block">
                <div style="width: 100%; text-align: center">
                    <img style="height: 80px" src="assets/img/lock2.png">
                </div>
                <div style="width: 100%; text-align: center">
                    <h2>
                        Forgot Password?
                    </h2>
                </div>
                <div style="width: 100%; text-align: center">
                    <span style="color: #777777">
                        Please enter your registered phone number/email id so that we can help you out with resetting your password.
                    </span>
                </div>
                <div style="text-align: center">
                    <input type="text" class="form-control" id="inputUser" placeholder="Phone Number/Email">
                </div>
                <div class="form-action-btn">
                    <div class="form-group row">
                        <div class="col-12 col-sm-12">
                            <button md-raised-button type="button" color="primary" class="btn btn-warning btn-block btn-login">RESET PASSWORD</button>
                        </div>
                    </div>
                </div>
            </div>
        </md-dialog-content>
    `
})

export class ForgotPasswordDialog {
    data;
    constructor(public dialog: MdDialog) { }
}



