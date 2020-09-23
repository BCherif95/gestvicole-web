import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthZImpl} from '../authz/impl/AuthZImpl';
import {ProjectUtils} from '../utils/project-utils';
import {definitions} from '../authz/role.definitions';
import {Observable} from 'rxjs';
import {RoleHelpers} from '../authz/role.helpers';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authz: AuthZImpl, private helpers: RoleHelpers) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authorize(state.url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authorize(state.url);
    }

    async authorize(url: string): Promise<boolean> {
        if (!localStorage.getItem('app-token')) {
            return this.router.navigateByUrl('/login');
        }
        const user = this.helpers.pu.getAppUser();
        if (!user) {
            return false;
        }
        const r = await this.authz.authorize(url, user.id.toString(), definitions);
        if (!r) {
            const redirectUrl = await this.helpers.first();
            return this.router.navigateByUrl(redirectUrl);
        }
        return true;
    }

}
