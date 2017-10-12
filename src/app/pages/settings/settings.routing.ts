import { Routes, RouterModule } from '@angular/router';
import { AllSettings } from './components/all-settings/all-settings.component';
import { Settings } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: Settings,
        children: [
        ]
    }
];

export const routing = RouterModule.forChild(routes);
