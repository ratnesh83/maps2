import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { SelectModule } from 'ng2-select';

import { NgaModule } from '../../theme/nga.module';

import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

import {
    MdTabsModule,
    MdInputModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdDatepickerModule,
    MdSelectModule,
    MdCardModule,
    MdChipsModule,
    MdIconModule,
    MdTooltipModule,
    MdDialogModule,
    MdSortModule,
    MdPaginatorModule,
    MdNativeDateModule
} from '@angular/material';

import { routing } from './users.routing';
import { Users } from './users.component';
import { AllEmployers } from './components/all-employers/all-employers.component';
import { AllWorkers } from './components/all-workers/all-workers.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { BlockWorkerModal } from './components/block-worker-modal/block-worker-modal.component';
import { BlockEmployerModal } from './components/block-employer-modal/block-employer-modal.component';
import { OpenDocumentModal } from './components/open-document-modal/open-document-modal.component';
import { ConfirmModal } from './components/confirm-modal/confirm-modal.component';
import { EditWorker } from './components/edit-worker/edit-worker.component';
import { EditEmployer } from './components/edit-employer/edit-employer.component';
import { SingleCustomer } from './components/single-customer/single-customer.component';

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
        MultiselectDropdownModule,
        MdTabsModule,
        MdInputModule,
        MdButtonModule,
        MdAutocompleteModule,
        MdDatepickerModule,
        MdSelectModule,
        MdTooltipModule,
        MdCardModule,
        MdChipsModule,
        MdIconModule,
        MdDialogModule,
        MdSortModule,
        MdPaginatorModule,
        GooglePlaceModule,
        MdNativeDateModule,
        SelectModule
    ],
    declarations: [
        Users,
        AllEmployers,
        AllWorkers,
        EditWorker,
        EditEmployer,
        BlockWorkerModal,
        BlockEmployerModal,
        OpenDocumentModal,
        ConfirmModal,
        SingleCustomer
    ],
    entryComponents: [
        BlockWorkerModal,
        BlockEmployerModal,
        OpenDocumentModal,
        ConfirmModal
    ],

})

export class UsersModule { }
