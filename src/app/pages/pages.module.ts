import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
// import { ChangePasswordModal } from './change-password/change-password-modal.component';
import { Pages } from './pages.component';
import { MdProgressSpinnerModule } from '@angular/material';

import { PagesMenuService } from './pages.menu';

@NgModule({
    imports: [
        CommonModule, 
        NgaModule,
        MdProgressSpinnerModule, 
        routing
    ],
    declarations: [Pages],
    providers: [PagesMenuService]
})

export class PagesModule {
}
