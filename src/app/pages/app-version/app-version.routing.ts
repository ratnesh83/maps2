import { Routes, RouterModule } from '@angular/router';
import { AppVersion } from './app-version.component';
import { Version } from './components/version/version.component';

const routes: Routes = [
    {
        path: '',
        component: AppVersion,
        children: [ ]
    }
];

export const routing = RouterModule.forChild(routes);
