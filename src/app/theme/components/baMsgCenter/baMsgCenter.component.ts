import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonService } from '../../../services/common.service';
import { Observable } from 'rxjs/Rx';

import { BaMsgCenterService } from './baMsgCenter.service';

import * as notification from '../../state/notification.actions';

@Component({
    selector: 'ba-msg-center',
    providers: [BaMsgCenterService],
    styleUrls: ['./baMsgCenter.scss'],
    templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter {

    //public notifications:Array<Object>;
    public notifications;
    public page = 1;
    public limit = 10;
    public count: number;
    public activeNotification;
    public unreadNotificationCount;



    // added
    //messages = [];
    //connection;
    //  message;

    //this.message = '';

    constructor(private _baMsgCenterService: BaMsgCenterService,
        private commonService: CommonService,
        private store: Store<any>) {

        this.store
            .select('notification')
            .subscribe((res: any) => {
                this.notifications = res.notifications;
                this.count = res.count;
                this.activeNotification = (res.activeNotification) ? res.activeNotification : null;
                this.unreadNotificationCount = res.unreadNotificationCount;
                //console.log(this.notifications);

            });


        this.commonService.getSocketConnection().on('connect', (socket) => {
        });

        this.commonService.getSocketConnection().on('notification', (data) => {

            if (data.notification && data.unreadNotificationCount) {
                this.notifications.unshift(data.notification);
                this.notifications.pop();
                // console.log(".....Working .....")
                // console.log( this.notifications);

                this.store.dispatch({
                    type: notification.actionTypes.PUSH_NOTIFICATION, payload: {
                        notification: this.notifications,
                        unreadNotificationCount: data.unreadNotificationCount
                    }
                });
            }

        });


        //console.log(this.commonService.getSocketConnection);

        /* new Observable(observer => {
     
           this.socket.on('connect', (socket) => {
             //console.log("Connection success fully ");
           });
     
           this.commonService.getSocketConnection.on('notification', (data) => {
             //observer.next(data);
             //console.log("Data ..s.dsfsd fd sfds f");
           });
         });*/

        // this.store.dispatch({ type: notification.actionTypes.GET_ALL_NOTIFICATION, payload: { currentPage: this.page, limit: this.limit } });

    }



    // sendMessage(){
    //   this._baMsgCenterService.sendMessage(this.message);
    //   this.message = '';
    // }

    // ngOnInit() {
    //
    // }
    //
    // ngOnDestroy() {
    //
    // }



    //
    //   // REF : https://stackoverflow.com/questions/42706655/using-ngrx-to-obtain-stores-current-state-once
    //   getState(store: any, selector?: any) {
    //   let _state: any;
    //   let state$: any;
    //
    //   if (typeof selector === 'string' && /\./g.test(selector)) {
    //     state$ = store.pluck(...selector.split('.'));
    //   } else if (typeof selector === 'string') {
    //     state$ = store.map(state => state[selector]);
    //   } else if (typeof selector === 'function') {
    //     state$ = store.map(state => selector(state));
    //   } else {
    //     state$ = store;
    //   }
    //   state$.take(1)
    //     .subscribe(o => _state = o);
    //   return _state;
    // }

    read(data) {
        this.store.dispatch({ type: notification.actionTypes.READ_NOTIFICATION, payload: data });
    }

}
