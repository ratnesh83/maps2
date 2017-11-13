import { Routes, RouterModule } from '@angular/router';

import { Posts } from './posts.component';
import { AllPosts } from './components/all-posts/all-posts.component';
import { PostJob } from './components/post-job/post-job.component';

const routes: Routes = [
    {
        path: '',
        component: Posts,
        children: [

            { path: '', redirectTo: 'allposts', pathMatch: 'full' },
            { path: 'allposts', component: AllPosts },
            { path: 'postjob', component: PostJob }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
