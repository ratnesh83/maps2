import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { TopNotifications } from '../pages/notification/components/top/top-notifications-component.ts';

import { BaThemeConfig } from './theme.config';

import { BaThemeConfigProvider } from './theme.configProvider';

import {
    BaAmChart,
    BaBackTop,
    BaCard,
    BaChartistChart,
    BaCheckbox,
    BaContentTop,
    BaFullCalendar,
    BaMenuItem,
    BaMenu,
    BaMsgCenter,
    BaMultiCheckbox,
    BaPageTop,
    BaPictureUploader,
    BaSidebar,
    BaFileUploader

} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
    BaScrollPosition,
    BaSlimScroll,
    BaThemeRun
} from './directives';

import {
    BaAppPicturePipe,
    BaKameleonPicturePipe,
    BaProfilePicturePipe
} from './pipes';

import {
    BaImageLoaderService,
    BaMenuService,
    BaThemePreloader,
    BaThemeSpinner,
    NotificationService
} from './services';

import {
    EmailValidator,
    EqualPasswordsValidator,
    NameValidator
} from './validators';

const NGA_COMPONENTS = [
    BaAmChart,
    BaBackTop,
    BaCard,
    BaChartistChart,
    BaCheckbox,
    BaContentTop,
    BaFullCalendar,
    BaMenuItem,
    BaMenu,
    BaMsgCenter,
    BaMultiCheckbox,
    BaPageTop,
    BaPictureUploader,
    BaSidebar,
    BaFileUploader
];

const NGA_DIRECTIVES = [
    BaScrollPosition,
    BaSlimScroll,
    BaThemeRun,
    BaCardBlur
];

const NGA_PIPES = [
    BaAppPicturePipe,
    BaKameleonPicturePipe,
    BaProfilePicturePipe
];

const NGA_SERVICES = [
    BaImageLoaderService,
    BaThemePreloader,
    BaThemeSpinner,
    BaMenuService
];

const NGA_VALIDATORS = [
    EmailValidator,
    EqualPasswordsValidator,
    NameValidator
];

@NgModule({
    declarations: [
        ...NGA_PIPES,
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS,
        TopNotifications
    ],
    entryComponents: [

    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgUploaderModule
    ],
    exports: [
        ...NGA_PIPES,
        ...NGA_DIRECTIVES,
        ...NGA_COMPONENTS
    ]
})
export class NgaModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: NgaModule,
            providers: [
                BaThemeConfigProvider,
                BaThemeConfig,
                NotificationService,
                DatePipe,
                ...NGA_VALIDATORS,
                ...NGA_SERVICES
            ],
        };
    }
}
