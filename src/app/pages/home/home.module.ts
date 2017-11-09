import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Home } from './home.component';
import { MdCardModule } from '@angular/material';
import { routing } from './home.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        MdCardModule,
        routing
    ],
    declarations: [
        Home,
    ],
    providers: [

    ]
})

export class HomeModule { }
