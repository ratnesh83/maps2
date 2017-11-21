import { Component } from '@angular/core';
import {
    Routes, Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import { Store } from '@ngrx/store';
import { BaMenuService } from '../theme';
import { PagesMenuService } from './pages.menu';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from '../theme/services';

@Component({
    selector: 'pages',
    template: `
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="container al-content">
        <router-outlet>
            <ba-sidebar></ba-sidebar>
        </router-outlet>
      </div>
    </div>
    <!--<footer class="al-footer clearfix">
      <div class="al-footer-right"></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; 2017 - Labor Go</div>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>-->
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

    PAGES_MENU;
    navigationLoading: boolean = false;

    constructor(private router: Router, private _menuService: BaMenuService, private PagesMenuService: PagesMenuService, private _spinner: BaThemeSpinner, private store: Store<any>) {

        this.PAGES_MENU = this.PagesMenuService.pageMenu();
        this._menuService.updateMenuByRoutes(<Routes>this.PAGES_MENU);

        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });

        BaThemePreloader.load().then((values) => {
            this._spinner.hide();
        });

    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.navigationLoading = true;
            //this._spinner.show();
        }
        if (event instanceof NavigationEnd) {
            this.navigationLoading = false;
            //this._spinner.hide();
        }
        if (event instanceof NavigationCancel) {
            this.navigationLoading = false;
            //this._spinner.hide();
        }
        if (event instanceof NavigationError) {
            this.navigationLoading = false;
            //this._spinner.hide();
        }
    }

}
