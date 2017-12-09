import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TopListsModule } from '../side-panel/side-panel.module';
import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './help-center.routing';
import { HelpCenter } from './help-center.component';
import { Help } from './components/help/help.component';
import { NgxPaginationModule } from 'ngx-pagination';
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
        TopListsModule,
        NgxPaginationModule,
        routing,
        NgPipesModule,
        NgbModule,
        MdButtonModule,
        MdAutocompleteModule,
        MdCardModule,
        MdSelectModule,
        MdDialogModule
    ],
    declarations: [
        HelpCenter,
        Help
    ],
    entryComponents: [

    ],

})
export class HelpCenterModule { }
