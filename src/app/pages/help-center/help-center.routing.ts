import { Routes, RouterModule } from '@angular/router';
import { HelpCenter } from './help-center.component';
import { Help } from './components/help/help.component';

const routes: Routes = [
    {
        path: '',
        component: HelpCenter,
        children: []
    }
];

export const routing = RouterModule.forChild(routes);
