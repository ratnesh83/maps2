import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopLists } from './side-panel.component';
import { MdCardModule } from '@angular/material';

@NgModule({
    declarations: [
        TopLists
    ],
    imports: [
        CommonModule,
        MdCardModule
    ],
    exports: [
        TopLists
    ],
    entryComponents: [ ]
})

export class TopListsModule { }
