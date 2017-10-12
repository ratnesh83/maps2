import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
//pipes
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination'; //

//import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from './notifications.routing';
import { TopNotifications } from './components/top/top-notifications-component';
import { PopNotification } from './components/pop/pop-notification.component';

import { AllNotifications } from './components/all-notifications/all-notifications.component';
import { Notifications } from './notifications.component';
import { NgaModule } from '../../theme/nga.module';


@NgModule({
    declarations: [
        Notifications,
        AllNotifications
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        routing,
        NgbModalModule,
        NgaModule,
        NgPipesModule
    ]

})
export class NotificationsModule { }
