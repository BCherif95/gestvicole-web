import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {AuthBody} from '../../../utils/auth-body';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';
import {ProjectUtils} from '../../../utils/project-utils';
import {FuseNavigationService} from '../../../../@fuse/components/navigation/navigation.service';
import {NavItemUtils} from '../../../utils/nav-item-utils';
import {RoleDatasource} from '../../../authz/impl/RoleDatasource';
import {RoleHelpers} from '../../../authz/role.helpers';


@Component({
    selector     : 'login-view',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    authBody: AuthBody;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param _router
     * @param _authService
     * @param _toastService
     * @param projectUtilsService
     * @param _fuseNavigationService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _toastService: ToastrService,
        private projectUtilsService: ProjectUtils,
        private _fuseNavigationService: FuseNavigationService,
        private roleHelpers: RoleHelpers
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        document.title = 'GESTION-AVICOLE | Auth';

        localStorage.removeItem('app-token');
        localStorage.removeItem('isLoggedin');
        this.authBody = new AuthBody();

        this.loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin(): void {

        this.authBody.username = this.loginForm.value.username;
        this.authBody.password = this.loginForm.value.password;
        this._authService.login(this.authBody).subscribe(async ret => {
            if (ret['status'] === 'OK') {
                this._toastService.success(ret['message']);
                // let encoded = btoa(JSON.stringify(ret['response']));
                // console.log('ENCODED : '+encoded);
                // let decoded = atob(encoded);
                // console.log('DECODED : '+decoded);
                localStorage.setItem('app-token', btoa(JSON.stringify(ret['response'])));
                localStorage.setItem('isLoggedin', 'true');

                /*const currentUser = this.projectUtilsService.getAppUser();
                const role = currentUser && currentUser.roles && currentUser.roles.length > 0 ? currentUser.roles[0] : null;
                const adminDefaultRoute = '/views/dashboards/main';
                const techDefaultRoute = '/tr/production/productions';
                const isAdmin = role && role.name && role.name.toUpperCase() === 'ADMIN';

                this._router.navigate([isAdmin ? adminDefaultRoute : techDefaultRoute]);*/

                // // Register the navigation to the service
                // this._fuseNavigationService.register('main', new NavItemUtils().getNavigations());
                //
                // // Set the main navigation as our current navigation
                // this._fuseNavigationService.setCurrentNavigation('main');
                const user = this.roleHelpers.pu.getAppUser();
                const id =  user ? user.id.toString() : '0';
                await this.roleHelpers.roleDatasource.load(id);
                const url = await this.roleHelpers.first('dashboard');
                await this._router.navigate([url]);
            } else {
                this._toastService.error(ret['message']);
                // console.log(ret['message']);
            }

        }, e => {
            this._toastService.error(environment.errorMessage);
            // console.log(e);
        });

    }
}
