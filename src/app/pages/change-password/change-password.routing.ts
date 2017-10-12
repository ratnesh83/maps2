import { Routes, RouterModule } from '@angular/router';

import { Password } from './change-password.component';


const routes: Routes = [
    {
        path: '',
        component: Password,

    }
];

export const routing = RouterModule.forChild(routes);
