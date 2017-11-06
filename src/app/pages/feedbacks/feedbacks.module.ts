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
import { RatingModule } from 'ngx-rating';
import {
    MdCardModule,
    MdTooltipModule,
    MdInputModule,
    MdIconModule,
    MdPaginatorModule
} from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
        routing,
        NgPipesModule,
        NgbModule,
        MdCardModule,
        MdTooltipModule,
        MdPaginatorModule,
        MdInputModule,
        MdIconModule,
        RatingModule
    ],
    declarations: [
        Feedbacks,
        Feeds
    ],
    entryComponents: [
    ]
})
export class FeedbacksModule { }