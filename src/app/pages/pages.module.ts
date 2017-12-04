import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { Pages } from './pages.component';
import { PagesMenuService } from './pages.menu';
import { BaMsgCenterService } from '../theme/components/baMsgCenter/baMsgCenter.service';
import { MdDialogModule } from '@angular/material';
import { ConfirmInvitationDialog } from './confirm-invitation-dialog/confirm-invitation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        MdDialogModule,
        routing
    ],
    declarations: [
        Pages,
        ConfirmInvitationDialog
    ],
    entryComponents: [
        ConfirmInvitationDialog
    ],
    providers: [
        PagesMenuService,
        BaMsgCenterService
    ]
})

export class PagesModule { }
