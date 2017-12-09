import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { TopListsModule } from '../side-panel/side-panel.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routing } from './payments.routing';
import { Payments } from './payments.component';
import { AllPayments } from './components/all-payments/all-payments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {
    MdButtonModule,
    MdAutocompleteModule,
    MdCardModule,
    MdSelectModule,
    MdDialogModule
} from '@angular/material';
import { DeleteCardModal } from './components/delete-card/delete-card.modal';
import { WarningModal } from './components/warning/warning.modal';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
        TopListsModule,
        NgxPaginationModule,
        routing,
        NgbModalModule,
        NgPipesModule,
        RouterModule,
        MdButtonModule,
        MdAutocompleteModule,
        MdCardModule,
        MdSelectModule,
        MdDialogModule
    ],
    declarations: [
        Payments,
        AllPayments,
        DeleteCardModal,
        WarningModal
    ],
    entryComponents: [
        DeleteCardModal,
        WarningModal        
    ],

})
export class PaymentsModule { }
