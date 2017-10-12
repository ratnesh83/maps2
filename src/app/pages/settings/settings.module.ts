import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { NgPipesModule } from 'ngx-pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './settings.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import {
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
    MdNativeDateModule
} from '@angular/material';

import { AllSettings } from './components/all-settings/all-settings.component';

import { Settings } from './settings.component';
import { NgaModule } from '../../theme/nga.module';

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
        MdCardModule,
        MdChipsModule,
        MdIconModule,
        MdDialogModule,
        MdSortModule,
        MdPaginatorModule,
        MdTooltipModule
    ],
    declarations: [
        Settings,
        AllSettings,
    ],
    entryComponents: [
    ],

})
export class SettingsModule { }
