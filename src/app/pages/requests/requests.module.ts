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
    MdTabsModule,
    MdInputModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdCardModule,
    MdSelectModule,
    MdDialogModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdPaginatorModule
} from '@angular/material';
import { routing } from './requests.routing';
import { Requests } from './requests.component';
import { AllRequests } from './components/all-requests/all-requests.component';
import { RequestDetails } from './components/request-details/request-details.component';
import { FeedbackDialog } from './components/feedback-dialog/feedback-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RatingModule } from 'ngx-rating';
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
        MdTabsModule,
        MdButtonModule,
        MdInputModule,
        MdAutocompleteModule,
        MdCardModule,
        MdSelectModule,
        MdDialogModule,
        MdTooltipModule,
        MdDatepickerModule,
        MdNativeDateModule,
        MdPaginatorModule,
        SelectModule,
        GooglePlaceModule,
        RatingModule,
        NguiMapModule.forRoot({ 
            apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDvIVQbdP34EXfGi0pDfHWetfGqIchpbSQ' 
        }),
    ],
    declarations: [
        Requests,
        AllRequests,
        RequestDetails,
        FeedbackDialog
    ],
    entryComponents: [
        FeedbackDialog
    ],
})

export class RequestsModule { }
