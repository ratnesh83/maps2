import { Routes, RouterModule } from '@angular/router';

import { MyNetworks } from './my-networks.component';
import { AllLaborList } from './components/all-labors/all-labors.component';
import { AllEmployerList } from './components/all-employers/all-employers.component';
import { AllCompanyList } from './components/all-companies/all-companies.component';
import { AllFriendList } from './components/all-friends/all-friends.component';

const routes: Routes = [
    {
        path: '',
        component: MyNetworks,
        children: [

            { path: '', redirectTo: 'alllabors', pathMatch: 'full' },
            { path: 'alllabors', component: AllLaborList },
            { path: 'allemployers', component: AllEmployerList },
            { path: 'allcompanies', component: AllCompanyList },
            { path: 'allfriends', component: AllFriendList }

        ]
    }
];

export const routing = RouterModule.forChild(routes);
