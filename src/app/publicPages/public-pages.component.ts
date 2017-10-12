import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../theme/services';

@Component({
    selector: 'publicpages',
    template: `
        <div>
            <router-outlet></router-outlet>
        </div> 
    `
})
export class PublicPages {

    constructor(private _spinner: BaThemeSpinner) {
        BaThemePreloader.load().then((values) => {
            this._spinner.hide();
        });
    }


}
