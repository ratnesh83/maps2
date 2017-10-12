import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

//import { AuthService } from '../../auth.service'

@Component({
    selector: 'app-password-recover',
    template: `
    
  `
})
export class RecoverComponent {
    public user: any = {
        realm: 'system',
        email: '',
    };
    public realms: any[] = [];

    constructor(

        private store: Store<any>
    ) {
        this.store
            .select('app')
            .subscribe((res: any) => this.realms = res.domains);
    }

    recover() {
        // this.authService.recover(this.user)
    }

}
