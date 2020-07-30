import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule, MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AgmCoreModule} from '@agm/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components/widget/widget.module';
import {UsersComponent} from './users/users.component';
import {UsersService} from './users/users.service';
import {RolesComponent} from './roles/roles.component';
import {RolesService} from './roles/roles.service';
import {UserService} from './user/user.service';
import {UserComponent} from './user/user.component';


const routes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        resolve: {
            data: UsersService
        }
    },
    {
        path: 'users/:id',
        component: UserComponent,
        resolve: {
            data: UserService
        }
    },
    {
        path: 'users/:id/:name',
        component: UserComponent,
        resolve: {
            data: UserService
        }
    },
    {
        path: 'roles',
        component: RolesComponent,
        resolve: {
            data: RolesService
        }
    },
];

@NgModule({
    declarations: [
        UsersComponent,
        UserComponent,
        RolesComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatDialogModule,
        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatListModule,
        MatDividerModule
    ],
    providers: [
        UsersService,
        UserService,
        RolesService
    ],
    entryComponents: []
})
export class AdminModule {
}
