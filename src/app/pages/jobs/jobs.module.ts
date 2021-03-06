import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { SelectModule } from 'ng2-select';
import { NgaModule } from '../../theme/nga.module';
import { TopListsModule } from '../side-panel/side-panel.module';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    MdButtonModule,
    MdAutocompleteModule,
    MdCardModule,
    MdSelectModule,
    MdDialogModule
} from '@angular/material';
import { routing } from './jobs.routing';
import { Jobs } from './jobs.component';
import { AllJobs } from './components/all-jobs/all-jobs.component';
import { JobDetails } from './components/job-details/job-details.component';
import { EmployerDetailDialog } from './components/user-detail-dialog/user-detail-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { NguiMapModule } from '@ngui/map';

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
        MultiselectDropdownModule,
        MdButtonModule,
        MdAutocompleteModule,
        MdCardModule,
        MdSelectModule,
        MdDialogModule,
        SelectModule,
        GooglePlaceModule,
        NguiMapModule.forRoot({ 
            apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDvIVQbdP34EXfGi0pDfHWetfGqIchpbSQ' 
        }),
    ],
    declarations: [
        Jobs,
        AllJobs,
        JobDetails,
        EmployerDetailDialog
    ],
    entryComponents: [
        EmployerDetailDialog
    ],
})

export class JobsModule { }
