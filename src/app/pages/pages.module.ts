import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { Pages } from './pages.component';
import { PagesMenuService } from './pages.menu';
import { BaMsgCenterService } from '../theme/components/baMsgCenter/baMsgCenter.service';

@NgModule({
    imports: [
        CommonModule,
        NgaModule,
        routing
    ],
    declarations: [Pages],
    providers: [
        PagesMenuService,
        BaMsgCenterService
    ]
})

export class PagesModule { }
