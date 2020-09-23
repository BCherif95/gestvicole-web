import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RoleHelpers} from '../authz/role.helpers';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private helpers: RoleHelpers) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.check();
    }

    private async check(): Promise<boolean> {
        if (localStorage.getItem('app-token')) {
            const url = await this.helpers.first();
            if (url === '/login') {
                localStorage.removeItem('app-token');
                return true;
            }
            return this.router.navigateByUrl(url);
        }
        return true;
    }
}
