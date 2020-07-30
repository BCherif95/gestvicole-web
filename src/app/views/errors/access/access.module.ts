import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSharedModule} from '@fuse/shared.module';
import {AccessErrorComponent} from './access.component';

const routes = [
    {
        path: '',
        component: AccessErrorComponent
    }
];

@NgModule({
    declarations: [
        AccessErrorComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AccessErrorModule {
}
