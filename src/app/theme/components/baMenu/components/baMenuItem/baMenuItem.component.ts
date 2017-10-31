import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../../auth/service/auth-service/auth.service';

import 'style-loader!./baMenuItem.scss';

@Component({
    selector: 'ba-menu-item',
    templateUrl: './baMenuItem.html'
})
export class BaMenuItem {

    @Input() menuItem: any;
    @Input() child: boolean = false;

    @Output() itemHover = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();

    constructor(private authService: AuthService) {
    }

    public onHoverItem($event): void {
        this.itemHover.emit($event);
    }

    public onToggleSubMenu($event, item): boolean {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    }


    public authCheck(): boolean {
    
        //console.log(this.menuItem);
        if (this.menuItem.auth) {
            if (this.authService.user.userType == this.menuItem.auth) {
                return true;
            }
            else {
                return false;
            }
        } else {
            return true;
        }

        // console.log(this.authService.user.role);
        // return true;

    }

}
