import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
//pipes
import { routing } from './change-password.routing';
import { NgPipesModule } from 'ngx-pipes';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { Password } from './change-password.component';

import { ChangePasswordModal } from './component/change-password-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule,
        NgbModalModule,
        NgPipesModule,
        routing
    ],
    declarations: [
        Password,
        ChangePasswordModal

    ],


})
export class ChangePasswordModule { }
