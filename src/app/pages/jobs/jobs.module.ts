import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
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

import { routing } from './jobs.routing';
import { Jobs } from './jobs.component';
import { AllJobs } from './components/all-jobs/all-jobs.component';
import { NgxPaginationModule } from 'ngx-pagination';

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
        MdNativeDateModule,
        SelectModule
    ],
    declarations: [
        Jobs,
        AllJobs
    ],
    entryComponents: [
    ],

})

export class JobsModule { }
