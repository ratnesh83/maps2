import { Component } from '@angular/core';
import { cloneDeep, random } from 'lodash';
import { ToastrService, ToastrConfig } from 'ngx-toastr';
const types = ['success', 'error', 'info', 'warning'];
@Component({
    selector: 'pop-notification',
    template: ``
})
export class PopNotification {
    private lastInserted: number[] = [];
    private options;

    constructor(private toastrService: ToastrService) {
        this.options = this.toastrService.toastrConfig;

        this.pushNotificationFxn();
    };
    pushNotificationFxn() {
        //   	let m = 'Hello .......';
        //   	let t = 'Notification';
        //   	const opt = cloneDeep(this.options);
        //   	opt.ositionClass = 'toast-bottom-right';
        //   	opt.positionClass = 'toast-bottom-right';
        //   	const inserted = this.toastrService[types[2]](m, t, opt);
        //   	if (inserted) {
        //     	this.lastInserted.push(inserted.toastId);
        //   	}
    }

}
