import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './feedbacks.routing';
import { Feedbacks } from './feedbacks.component';
import { Feeds } from './components/feeds/feeds.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { DriverModal } from './components/driver-detail-modal/driver-detail.component';
// import { DeleteDriverModal } from './components/delete-driver-modal/delete-driver-component';
// import { BlockDriverModal } from './components/block-driver-modal/block-driver-modal-component';
// import { AddDriverModal } from './components/add-driver-modal/add-driver-modal.component';
// import { EditDriverModal } from './components/edit-driver-modal/edit-driver-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
        NgxPaginationModule,
        routing,
        NgPipesModule,
        NgbModule,

    ],
    declarations: [
        Feedbacks,
        Feeds
    ],
    entryComponents: [

    ],
})

export class FeedbacksModule { }
