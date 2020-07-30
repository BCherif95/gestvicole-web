import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if (localStorage.getItem("app-user")) {
            return true;
        }*/
        if (localStorage.getItem('app-token') && localStorage.getItem('isLoggedin')==='true') {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
        }
    }

}
