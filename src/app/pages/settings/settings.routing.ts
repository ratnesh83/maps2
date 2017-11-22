import { Routes, RouterModule } from '@angular/router';
import { AuthGuardAdmin } from '../auth/service/auth-service/auth-guard-admin.service';
import { AuthGuardCustomer } from '../auth/service/auth-service/auth-guard-customer.service';
import { AllSettings } from './components/all-settings/all-settings.component';
import { Settings } from './settings.component';
import { UserProfile } from './components/user-profile/user-profile.component';
import { UserProfileEdit } from './components/user-profile-edit/user-profile-edit.component';
import { EmployeeProfileEdit } from './components/employee-profile-edit/employee-profile-edit.component';

const routes: Routes = [
    {
        path: '',
        component: Settings,
        children: [
            { path: 'userprofile', component: UserProfile },
            { path: 'employerprofile', component: AllSettings },
            { path: 'userprofileedit', component: UserProfileEdit },
            { path: 'employerprofileedit', component: EmployeeProfileEdit }
        ]
    }
];

export const routing = RouterModule.forChild(routes);
