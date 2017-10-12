import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
    selector: 'open-document-modal',
    template: `
        <md-dialog-content>
            <img style="max-width: 60vw" [src]="document">
        </md-dialog-content>
    `
})

export class OpenDocumentModal {
    document;
    
    constructor(public dialog: MdDialog) { }
}



