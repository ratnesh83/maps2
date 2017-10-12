import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app-version.routing';
import { AppVersion } from './app-version.component';
import { Version } from './components/version/version.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
        NgxPaginationModule,
        routing,
        NgPipesModule,
        NgbModule
    ],
    declarations: [
        AppVersion,
        Version
    ],
    entryComponents: [

    ],

})

export class AppVersionModule { }
