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
import { routing } from './my-networks.routing';
import { MyNetworks } from './my-networks.component';
import { AllLaborList } from './components/all-labors/all-labors.component';
import { AllEmployerList } from './components/all-employers/all-employers.component';
import { AllCompanyList } from './components/all-companies/all-companies.component';
import { AllFriendList } from './components/all-friends/all-friends.component';
import { SendInviteDialog } from './components/send-invite-dialog/send-invite-dialog.component';
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
    ],
    declarations: [
        MyNetworks,
        AllLaborList,
        AllEmployerList,
        AllCompanyList,
        AllFriendList,
        SendInviteDialog
    ],
    entryComponents: [
        SendInviteDialog
    ],
})

export class MyNetworksModule { }
