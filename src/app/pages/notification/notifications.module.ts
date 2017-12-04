import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './notifications.routing';
import { TopNotifications } from './components/top/top-notifications-component';
import { PopNotification } from './components/pop/pop-notification.component';
import { AllNotifications } from './components/all-notifications/all-notifications.component';
import { Notifications } from './notifications.component';
import { NgaModule } from '../../theme/nga.module';
import { MdCardModule, MdPaginatorModule, MdTooltipModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdCardModule,
        MdTooltipModule,
        MdPaginatorModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        routing,
        NgbModalModule,
        NgaModule,
        NgPipesModule
    ],
    declarations: [
        Notifications,
        AllNotifications
    ],
    entryComponents: []
})

export class NotificationsModule { }
