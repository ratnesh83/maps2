import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
//pipes

import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routing } from './payments.routing';
import { Payments } from './payments.component';
import { AllPayments } from './components/all-payments/all-payments.component';
import { NgxPaginationModule } from 'ngx-pagination'; //
import {
    MdButtonModule,
    MdAutocompleteModule,
    MdCardModule,
    MdSelectModule,
    MdDialogModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
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
    ],
    entryComponents: [
    ],

})
export class PaymentsModule { }
