import { Routes, RouterModule } from '@angular/router';

import { Posts } from './posts.component';
import { AllPosts } from './components/all-posts/all-posts.component';

const routes: Routes = [
    {
        path: '',
        component: Posts,
        children: [

            { path: '', redirectTo: 'allposts', pathMatch: 'full' },
            { path: 'allposts', component: AllPosts }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
