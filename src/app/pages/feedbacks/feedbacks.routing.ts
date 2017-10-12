import { Routes, RouterModule } from '@angular/router';
import { Feedbacks } from './feedbacks.component';
import { Feeds } from './components/feeds/feeds.component';

const routes: Routes = [
    {
        path: '',
        component: Feedbacks,
        children: [ ]
    }
];

export const routing = RouterModule.forChild(routes);
