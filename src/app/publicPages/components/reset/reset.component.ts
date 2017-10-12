import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import { LoopBackAuth, SDKToken } from '@lb-sdk'

//import { AuthService } from '../../auth.service'

@Component({
    selector: 'app-password-reset',
    template: `

  `
})
export class ResetComponent {
    private token: string = null;
    public user: any = {
        password: '',
        verify: '',
    };
    public realms: any[] = [];

    constructor(

        //  private loopBackAuth: LoopBackAuth,

        // private loopBackAuth: LoopBackAuth,

        // private authService: AuthService,
        private route: ActivatedRoute,
    ) {
        this.route.queryParams.subscribe((params: any) => {
            // console.log('setting token', params.token);

            // this.loopBackAuth.setToken(new SDKToken({ id: params.token, created: new Date() }))

        });
    }

    reset() {
        //this.authService.reset(this.user)
    }
    // =======
    //     this.authService.reset(this.user)
    // >>>>>>> 8b07083fc95e414d9cd8bef3377e7c6493abf425



}
