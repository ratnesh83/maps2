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
import { routing } from './posts.routing';
import { Posts } from './posts.component';
import { AllPosts } from './components/all-posts/all-posts.component';
import { PostDetails } from './components/post-details/post-details.component';
import { PostJob } from './components/post-job/post-job.component';
import { EditPost } from './components/edit-job/edit-job.component';
import { CancelJobDialog } from './components/cancel-job-dialog/cancel-job-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { NguiMapModule } from '@ngui/map';

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
        NguiMapModule.forRoot({ 
            apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDvIVQbdP34EXfGi0pDfHWetfGqIchpbSQ' 
        }),
        TopListsModule
    ],
    declarations: [
        Posts,
        AllPosts,
        PostDetails,
        PostJob,
        EditPost,
        CancelJobDialog
    ],
    entryComponents: [
        CancelJobDialog
    ]
})

export class PostsModule { }
