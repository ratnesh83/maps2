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
    MdNativeDateModule,
    MdCheckboxModule,
} from '@angular/material';
import { AllSettings } from './components/all-settings/all-settings.component';
import { EmployeeProfileEdit } from './components/employee-profile-edit/employee-profile-edit.component';
import { OpenDocumentModal } from './components/open-document-modal/open-document-modal.component';
import { Settings } from './settings.component';
import { NgaModule } from '../../theme/nga.module';
import { UserProfile } from './components/user-profile/user-profile.component';
import { UserProfileEdit } from './components/user-profile-edit/user-profile-edit.component';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { AvailabilityCalendar } from './components/availability-calendar/availability-calendar.component';

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
        MdTooltipModule,
        MdCheckboxModule,
        GooglePlaceModule
    ],
    declarations: [
        Settings,
        AllSettings,
        EmployeeProfileEdit,
        UserProfile,
        UserProfileEdit,
        AvailabilityCalendar,
        OpenDocumentModal
    ],
    entryComponents: [
        OpenDocumentModal
    ],

})
export class SettingsModule { }
