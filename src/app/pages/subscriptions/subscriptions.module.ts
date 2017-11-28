import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './subscriptions.routing';
import { Subscriptions } from './subscriptions.component';
import { AllSubscriptions } from './components/all-subscriptions/all-subscriptions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlockSubscriptionDialog } from './components/block-subscription-dialog/block-subscription-dialog.component';
import {
    MdTabsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdSortModule,
    MdDatepickerModule,
    MdSelectModule,
    MdNativeDateModule,
    MdDialogModule,
    MdTooltipModule,
    MdAutocompleteModule,
    MdCardModule,
    MdPaginatorModule
} from '@angular/material';


@NgModule({
    imports: [
        MdInputModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
        MdTabsModule,
        MdButtonModule,
        MdIconModule,
        MdSortModule,
        MdDatepickerModule,
        MdSelectModule,
        MdPaginatorModule,
        MdNativeDateModule,
        MdDialogModule,
        MdCardModule,
        MdPaginatorModule,
        NgxPaginationModule,
        MdTooltipModule,
        routing,
        NgPipesModule,
        NgbModule,
        MultiselectDropdownModule
    ],
    declarations: [
        Subscriptions,
        AllSubscriptions,
        BlockSubscriptionDialog
    ],
    entryComponents: [
        BlockSubscriptionDialog
    ],

})

export class SubscriptionsModule { }
